<?php

namespace Reactive\App;
/**
*
*/
class PostData
{
  public static function get_post_data( $post_ids = null ){
    $temp_postIds = $post_ids;
    if (empty($post_ids)) $post_ids = array('nothing');
    $temp_postIds_placeholder = implode(', ', array_fill(0, count($post_ids), '%d'));
    $post_data = new PostData();
    $all_posts = array();
    $data = array();

    global $wpdb;
    if (empty($post_ids)) $post_ids = array('nothing');
    $post_ids_placeholder = implode(', ', array_fill(0, count($post_ids), '%d'));
    $post_ids[] = 'publish';
    $post_ids[] = 'inherit';
    $post_ids = array_merge($post_ids, $temp_postIds);
    $query = $wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE {$wpdb->posts}.ID IN ($post_ids_placeholder) AND ({$wpdb->posts}.post_status = %s OR {$wpdb->posts}.post_status = %s) ORDER BY FIELD ({$wpdb->posts}.ID, $temp_postIds_placeholder)", $post_ids) ;
    $posts = $wpdb->get_results($query , 'OBJECT');
      $taxonomies = array();

      foreach ($posts as $post) {

        //$taxonomies = get_object_taxonomies( $post->post_type);
        $allowed_key = $post_data->get_meta_keys( $post->post_type );

        $post->protocol = is_ssl() == true ? 'https' : 'http';
        $post->post_author_name = get_the_author_meta('display_name', $post->post_author);
        $post->post_author_url = get_author_posts_url( $post->post_author );
        $post->post_formated_date = get_the_date( $format='', $post->ID );
        //$post->terms = $post_data->get_post_terms($post->ID, $taxonomies);
        $post->meta = $post_data->get_post_metadata( $post->ID, $post->post_type );
        if(isset($post->meta['_thumbnail_id']) && !empty($post->meta['_thumbnail_id'])) {
          $post->thumb_url = $post_data->get_post_image( $post->meta['_thumbnail_id'] );
          $post->thumb_alt = $post_data->get_post_image_alt_text( $post->meta['_thumbnail_id'] );
        }
        $post->gallery_image_urls = $post_data->get_post_gallery( $post );
        $post->post_link = $post_data->get_post_link( $post->ID );
        $post->wow = $post_data->get_shortcode_content( $post );

        if( isset( $post->terms['post_format'] ) && !empty( $post->terms['post_format'] ) ) {
          $format = get_post_format( $post->ID );
          if( !empty( $format ) ) {
            $post->post_format = $format;
          } else {
            $post->post_format = 'standard';
          }
        } else {
          $post->post_format = 'standard';
        }
      array_push($data, $post);
      }

    $all_posts = array(
      'data' => $data
    );
    return $all_posts;
  }

  public function get_post_terms($post_id, $taxonomies) {
    $temp = array();
    foreach ($taxonomies as $taxonomy) {
      $terms = wp_get_post_terms( $post_id, $taxonomy );
      $temp[$taxonomy] = array();
      foreach ($terms as $term) {
        $term_info = array();
        $slug = apply_filters( 'editable_slug', $term->slug );
        $term_url = '';
        $term_url = '?'.$taxonomy.'='.esc_attr($slug);
        $term_info['slug'] = esc_attr($slug);
        $term_info['name'] = $term->name;
        $term_info['link'] = $term_url;
        $temp_term_meta_color = array();
        $temp_term_meta_color = get_term_meta($term->term_id);
        if(isset($temp_term_meta_color) && is_array($temp_term_meta_color) && array_key_exists("color",$temp_term_meta_color)) {
            if(is_array($temp_term_meta_color['color'])) {
              $term_info['term_meta_color'] = $temp_term_meta_color['color'][0]; //term meta
            }
        }
        $temp[$taxonomy][] = $term_info;
      }
    }
    return $temp;
  }

  public function get_post_metadata($post_id, $post_type = 'post')
  {
    $fields = get_post_custom($post_id);
    $temp = array();
    $allowed_key = $this->get_meta_keys( $post_type );

    foreach ($fields as $metakey => $metavalues) {

      if( in_array( $metakey, $allowed_key ) ) {
        if(!empty($metavalues)){
          if( $metavalues[0] != null ) {
            $temp[$metakey] = $metavalues[0];
            if (
              in_array(
                'woocommerce/woocommerce.php',
                apply_filters( 'active_plugins', get_option( 'active_plugins' ) )
              )
            ) {
              if ($metakey === '_product_image_gallery'){
                $attachment_ids = explode(',', $metavalues[0]);
                foreach( $attachment_ids as $attachment_id ) {
                  $image_link = wp_get_attachment_url( $attachment_id );
                  $temp['_product_image_gallery_links'][] = $image_link;
                }
              }
            }
            if($metakey === 'company_logo'){
              $temp_meta_value = unserialize($temp[$metakey]);
              if(isset($temp_meta_value) && is_array($temp_meta_value)) {
                if(isset($temp_meta_value[0]['url']) && !empty($temp_meta_value[0]['url'])) {
                  $temp['company_logo'] = $temp_meta_value[0]['url']; // meta image
                }
              }
            }
          }
        }
      }

    }
    return $temp;
  }

  public function get_meta_keys( $post_type='post' ) {

    global $wpdb;
    $graph = new Graph();
    $all_post_types = explode(",",$post_type);
    $generate = '';
    $all_keys = array();
    // $reactive_data = get_option('reactive_data', true);
    $reactive_data = $graph->get_all_restricted_metas();
    $restrict_array = array();

    foreach ($all_post_types as $type ) {
      //$selected_data = $this->search($reactive_data, 'post_type', $type);
      // if( !empty( $reactive_data ) ) {
      //   if( isset( $reactive_data ) ) {
      //     $restrict_array = $this->array_values_recursive($selected_data['selectedData'], 'type', 'meta');
      //   }

      // }

      $query = $wpdb->prepare("SELECT DISTINCT pm.meta_key FROM {$wpdb->posts} post INNER JOIN
        {$wpdb->postmeta} pm ON post.ID = pm.post_id WHERE post.post_type='%s'",$type);
      $result = $wpdb->get_results($query , 'ARRAY_A');

      if( !empty($result) ){
        foreach ($result as $res) {
          //&& strpos( $res['meta_key'] ,'_') != 0
          if( !in_array( $res['meta_key'], $reactive_data ) && !in_array($res['meta_key'], $all_keys ) ){
            $all_keys[] = $res['meta_key'];
          }
        }
      }
    }
    return $all_keys;
  }

  public function get_post_image($thumnail_id='')
  {
    if ($thumnail_id){
      $image = wp_get_attachment_image_src( $thumnail_id, 'full' );

      return $image[0];
    }
  }

  public function get_post_image_alt_text($thumnail_id='')
  {
    if ($thumnail_id){
      $alt_text = get_post_meta($thumnail_id , '_wp_attachment_image_alt', true);
      return $alt_text;
    }
  }

  public function get_post_gallery($content_post)
  {
    $content = $content_post->post_content;
    $gallery_ids = array();
    $temp = array();
    if (strpos($content, 'gallery ids') !== false) {
      if(preg_match('/"([^"]+)"/', $content, $attachment_ids)){
        $gallery_ids = $attachment_ids[1];
      }
      $gallery_ids = explode(',', $gallery_ids);
    }
    foreach( $gallery_ids as $gallery_id ) {
      $image_link = wp_get_attachment_url( $gallery_id );
      $temp[] = $image_link;
    }
    return $temp;
  }

  public function get_post_link($post_id)
  {
    return get_the_permalink( $post_id );
  }

  public function get_shortcode_content($content_post)
  {
    $content = $content_post->post_content;
    $content = apply_filters('the_content', $content);
    $content = str_replace(']]>', ']]&gt;', $content);
    return do_shortcode($content);
  }

  private function search($array, $key, $value) {
    $results = array();
    if (is_array($array))
    {
      if (isset($array[$key]) && $array[$key] == $value)
        $results = $array;

      foreach ($array as $subarray)
        $results = array_merge($results, $this->search($subarray, $key, $value));
    }
    return $results;
  }

}
