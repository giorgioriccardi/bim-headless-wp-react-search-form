<?php

namespace Reactive\App;
use Reactive\App\GridPostData;
use Reactive\App\CategoryData;
use Reactive\Admin\RedQ_Provider;
class AsyncHandler extends RedQ_Provider
{
  /**
     * Action hook used by the AJAX class.
     *
     * @var string
     */
    const ACTION = 'reactive_ajax';

    /**
     * Action argument used by the nonce validating the AJAX request.
     *
     * @var string
     */
    const NONCE = 'reactive_ajax_nonce';

  /**
   * Register the AJAX handler class with all the appropriate WordPress hooks.
   */
  public function __construct() {
    add_action('wp_ajax_'. self::ACTION, array($this, 'handle_ajax'));
    add_action('wp_ajax_nopriv_' . self::ACTION, array($this, 'handle_ajax'));
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

	public function handle_ajax()
	{
    check_ajax_referer(self::NONCE, 'nonce');
		$ajax_data = $_POST;
		unset($ajax_data['nonce']);
		unset($ajax_data['action']);
		switch ($ajax_data['action_type']) {

      case 'load_graph':
        $graph = new Graph();
        echo json_encode(array(
          'allterms'   => $graph->get_all_terms(),
          'termToTerm' => $graph->get_term_to_term(),
          'termToPost' => $graph->get_term_to_post(),
        ));
      break;

      case 'save_settings':
        $wpml_lang = '';
        include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
          //plugin is activated
          $wpml_lang = ICL_LANGUAGE_CODE;
        }

        if (isset($ajax_data['selected_template'])) {
          update_option( 'reactive_selected_template', $ajax_data['selected_template']);
        }
        if($wpml_lang === '') {
          if(!isset($ajax_data['data']['allbox'])){
            update_option( 'reactive_selected_template', '');
          }
          update_post_meta($ajax_data['key'], 'reactivedata', $ajax_data['data']);
          echo json_encode($ajax_data['data']);
        } else {
          update_post_meta($ajax_data['key'], 'reactivedata_' . $wpml_lang, $ajax_data['data']);
          echo json_encode($ajax_data['data']);
        }
      break;

      case 'get_map_content':
        $postId = $_POST['ID'];
        $post = get_post($postId);
        $taxonomies = $this->get_all_taxonomies( $post->post_type );
        $post->post_author_name = get_the_author_meta('display_name', $post->post_author);

        // $post_terms = $this->get_post_terms( $post->ID , $taxonomies );
        // $post->terms = apply_filters('re_preview_post_terms', $post_terms, $post->ID , $taxonomies );

        $post_meta = $this->get_post_metadata( $post->ID, $post->post_type);

        // $post->meta = apply_filters('re_preview_post_meta', $post_meta, $post->ID, $post_types, $allowed_key );
        $post->meta = apply_filters('re_preview_post_meta', $post_meta, $post->ID);

        $post->thumb_url = $this->get_post_image( $post->ID );
        $post->thumb_alt = $this->get_post_image_alt_text( $post->ID );
        $post->gallery_image_urls = $this->get_post_gallery( $post );
        $post->post_link = $this->get_post_link( $post->ID );

        echo json_encode($post);
      break;

      case 'grid_customization':
        $this->grid_customization($ajax_data);
      break;

      case 'category_customization':
        $this->category_customization($ajax_data);
      break;

      case 'save_geobox_settings':
        $this->save_geobox_settings($ajax_data);
      break;
      case 'save_general_settings':
        $this->save_general_settings($ajax_data);
      break;
      case 'sync_builder_data':
        $this->sync_builder_data($ajax_data);
      break;
      case 'save_meta_restrictions':
        $this->save_meta_restrictions($ajax_data);
      break;
      case 'get_widgets':
        global $wp_registered_sidebars;
        $sidebar_name = $ajax_data['data']['selectedWidget'];
        include_once(RE_TEMPLATE_PATH.'sidebar/sidebar.php');
      break;
      case 'save_widgets':
        update_post_meta($ajax_data['key'], 'reactivedata', $ajax_data['data']);
        echo json_encode($ajax_data['data']);
      break;
      case 'search':
        $url_data = isset($ajax_data['urlData'])? $ajax_data['urlData'] : [];
        $builder_key = $ajax_data['key'];
        $radius = isset($ajax_data['radius']) ? $ajax_data['radius'] :100;
        if(isset($builder_key)){
          $search_result = $this->get_search_result($url_data, $builder_key, $radius);
          echo json_encode($search_result);
        }else{
          echo 'something went wrong';
        }
      break;
      // case 'sorting':
      //   $sorted_result = $this->process_sorting_data($ajax_data['key'], $ajax_data['sort_type']);
      //   echo $sorted_result;
      // break;
      case 'autocomplete_search':
        $searched_result = $this->process_search_data($ajax_data['key'], $ajax_data['seacrch_text']);
        echo json_encode($searched_result);
      break;
      case 'save_layouts':
        $template_data = isset($ajax_data['data']) ? $ajax_data['data'] : 'null';
        if ($template_data !== null) {
          $template_id = $this->process_template_sorting($template_data);
          echo $template_id;
        }
      break;
    }
    wp_die();
	}

  public function get_meta_keys( $post_type='post' ) {

    global $wpdb;
    $graph = new Graph();
    $all_post_types = explode(",",$post_type);
    $generate = '';
    $all_keys = array();

    $reactive_data = $graph->get_all_restricted_metas();
    $restrict_array = array();

    foreach ($all_post_types as $type ) {

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


  public function grid_customization($ajax_data = '') {
    if(isset($ajax_data['data']['posts']) && count($ajax_data['data']['posts'])) {
      $output = '';
      $output = GridPostData::get_post_data($ajax_data['data']['posts']);
      $output = json_encode($output);
      echo $output;
     } else {
      $output = json_encode([]);
      echo $output;
     }
  }

  public function category_customization($data = null) {
    if(isset($data['categories']) && !empty($data['categories'])) {
      $output = '';
      $output = CategoryData::get_category_data($data['categories']);
      $output = json_encode($output);
      echo $output;
     }
  }

  private function save_geobox_settings($data){
    update_option('_reactive_geobox_settings', $data['selectedPosttypes']);
  }
  private function save_general_settings($data){
    update_option('_reactive_general_settings', $data['generalSettings']);
  }
  private function sync_builder_data($data){
    $wpml_lang = '';
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
      //plugin is activated
      $wpml_lang = ICL_LANGUAGE_CODE;
    }

    $grid_settings = json_decode( stripslashes_deep( $data['gridSettings'] ) );

    if ($wpml_lang == '') {

      foreach ($grid_settings as $key => $single_grid_setting) {
        if ($key == 397) {
        }
        update_post_meta($key, 'reactivedata', $single_grid_setting);
      }
    }else{
      foreach ($grid_settings as $key => $single_grid_setting) {
        update_post_meta($key, 'reactivedata_'.$wpml_lang, $single_grid_setting);
      }
    }


    // foreach ($grid_settings as $key => $single_grid_setting) {
    //   update_post_meta($key, 'reactivedata', $single_grid_setting);
    // }
  }
  private function save_meta_restrictions($data){
    update_option('_reactive_meta_restrictions', $data['selectedMetas']);
  }

  public function get_term_meta_to_term($data) {
    $graph = new Graph();
    $term_meta_key = [];
    $box_settings = isset($data['boxSettings']) ? $data['boxSettings'] : [];
    $term_meta_to_terms = '';
    foreach ($box_settings as $key => $single_settings) {
      if (isset($single_settings['type']) && $single_settings['type'] === 'selectGroup' && isset($single_settings['preload']) && $single_settings['preload'] === 'termMeta') {
        $term_meta_key[] = $single_settings['preloadItem'];
      }
    }
    $term_meta_to_terms= $graph->get_term_meta_to_term_data($term_meta_key);
    foreach ($box_settings as $key => $single_settings) {
      if (isset($single_settings['subtype']) && $single_settings['subtype'] === 'onlyImage') {
        foreach ($term_meta_to_terms as $key => $single_term_meta_object) {
          $termMetaData = maybe_unserialize($single_term_meta_object['id']);
          if(is_array($termMetaData)) {
            $term_meta_to_terms[$key]['id'] = $termMetaData[0]['id'];
            $term_meta_to_terms[$key]['value'] = $termMetaData[0]['value'];
            $term_meta_to_terms[$key]['imageUrl'] = $termMetaData[0]['url'];
          } else {
          $term_meta_to_terms[$key]['imageUrl'] = wp_get_attachment_url( $single_term_meta_object['id'] );
          }
        }
      }
    }
    return $term_meta_to_terms;
  }

  public function get_search_result($url_data, $key, $radius){
    if(!empty($url_data)){
      $graph = new Graph();
      if(isset($url_data['text'])){
        $text_search_string = $url_data['text'][0];
        $search_result = $graph->text_search_result($text_search_string);
      }
      if(isset($url_data['mapautocomplete'])){
        $geo_search_string = $url_data['mapautocomplete'][0];
        $geo_search_result_array = $graph->get_geo_search_result($geo_search_string, $radius);
        if (is_array($geo_search_result_array)) {
          $geo_search_result = implode(',', $geo_search_result_array);
        }
      }
      return array(
        'text' => isset($search_result) ? $search_result : '',
        'mapautocomplete' => isset($geo_search_result) ? $geo_search_result : ''
      );
    }
    return 'something went wrong';
  }

  public function process_sorting_data($builder_key, $sort_type){
    $graph = new Graph();
    $sorting_result = [];
    $builder_settings = json_decode(get_post_meta($builder_key, '_reactive_rebuilder_settings', true));
    switch ($sort_type) {
      case 'post_key':
      $post_types = explode(',', $builder_settings->rebuilder_post_type_select);
      $sorting_result = $graph->sorting($post_types);
        break;
      case 'meta_key':
        $metakeys = explode(',', $builder_settings->rebuilder_meta_keys_select);
        $sorting_result = $graph->sort_by_meta_key_value($metakeys);
        break;
    }
    return $sorting_result;
  }

  public function process_search_data($builder_key, $searched_text){
    $graph = new Graph();
    $searched_result = [];
    $builder_settings = json_decode(get_post_meta($builder_key, '_reactive_rebuilder_settings', true));
    $post_types = explode(',', $builder_settings->rebuilder_post_type_select);
    $searched_result = auto_complete_search($post_types, $searched_text);
    return $searched_result;
  }

  public function process_template_sorting($template_data) {
    $layout_info = json_decode(stripslashes_deep( $template_data['layouts_data']));
    if($template_data['saveAs'] == 'false') {
      update_post_meta( $template_data['ID'], 'reactive_grid_template', $template_data );
      update_post_meta( $template_data['ID'], 'readOnly', 'false' );
      return $template_data['ID'];
    }else if($template_data['saveAs'] == 'true'){
      $args = array(
        'post_title'    => wp_strip_all_tags( $template_data['post_title']),
        'post_status'   => 'publish',
        'post_author'   => get_current_user_id(),
        'post_type'   => 'reactive_layouts'
      );
      $new_layout_id = wp_insert_post( $args );
      update_post_meta($new_layout_id, 'reactive_grid_template', $template_data);
      update_post_meta( $new_layout_id, 'readOnly', 'false' );
      update_option('reactive_selected_template', $new_layout_id);
      return $new_layout_id;
    }
  }
}
