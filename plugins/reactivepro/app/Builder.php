<?php

namespace Reactive\App;


class Builder extends Provider {

  public $location = array();

	public function __construct(){

		$ajax_events = array(
      'add_new_layout' => true ,
			'save_settings' => true ,
			'save_builder' => true,
      'load_request_data' => true,
      'add_search_element'=> true,
      'filter_data' => true,
      'load_sidebar' => true,
		);
		foreach ( $ajax_events as $ajax_event => $nopriv ) {
			add_action( 'wp_ajax_re_' . $ajax_event, array( $this, $ajax_event ) );
			if ( $nopriv ) {
				add_action( 'wp_ajax_nopriv_re_' . $ajax_event, array( $this , $ajax_event ) );
			}
		}
	}


	public function save_builder()
	{
		$nonce = $_POST['builder_nonce'];
	  if(! wp_verify_nonce( $nonce, 'builder_nonce'))
	    die( 'Nope!');

    if( isset($_POST['post_id']) && !empty($_POST['post_id']) ){
			$post_id = $_POST['post_id'];

      unset($_POST['post_id']);
			unset($_POST['builder_nonce']);

      $metakey = '_reactive_builder_'.$_POST['shortcodeKey'];
      $settingsKey = '_reactive_settings_'.$_POST['shortcodeKey'];

    	if ( isset($_POST['allLayout']) && !empty($_POST['allLayout']) ) {

				update_post_meta($post_id , $metakey , $_POST['allLayout']);
        $allData = array();
        $allData['allLayout'] = $_POST['allLayout'];
        $loaded = array();

        $postTypes = get_post_meta($_POST['shortcodeKey'], 'rebuilder_post_type', true);
        $loaded = $this->load_helper_data($_POST['shortcodeKey'], $postTypes, $allData['allLayout']);

        if( !isset($_POST['return']) ){
				  echo json_encode($loaded);
        }else{
          echo json_encode(array());
        }
			}else{
        $all = array();
        $shortcodeKey = $_POST['shortcodeKey'];
        $all[$shortcodeKey] = array(
          'layoutData' => array()
        );
				delete_post_meta($post_id, $metakey);
				echo json_encode($all);
			}
    }
		wp_die();
	}

  public function save_settings() {
    $nonce = $_POST['builder_nonce'];
    if(! wp_verify_nonce( $nonce, 'builder_nonce'))
      die( 'Nope!');

    $loaded_data = array();
    $shortcodeKey = $_POST['shortcodeKey'];

    if( isset($_POST['post_id']) && !empty($_POST['post_id']) ){
      $post_id = $_POST['post_id'];
      unset($_POST['post_id']);
      unset($_POST['builder_nonce']);

      $metakey = '_reactive_settings_'.$_POST['shortcodeKey'];

      if ( isset($_POST['settingsData']) && !empty($_POST['settingsData']) ) {
        update_post_meta($post_id, $metakey, $_POST['settingsData']);
        $loaded_data[$shortcodeKey]['helperData'] = $this->get_helper_data($_POST['settingsData']['post_type']);
        $loaded_data[$shortcodeKey]['settingsData'] = $_POST['settingsData'];
        $loaded_data[$shortcodeKey]['previewData']  = $this->get_filtered_data(array(
          'postTypes' => $_POST['settingsData']['post_type'],
        ));
      }
      echo json_encode($loaded_data);
    }
    wp_die();
  }




  public function build_settings($post_type) {
    $loaded_data = array();
    $loaded_data['helperData'] = $this->get_helper_data($post_type);
    $loaded_data['previewData']  = $this->get_filtered_data(array(
      'postTypes' => $post_type,
    ));
    return $loaded_data;
  }


  public function load_request_data()
  {
    $nonce = $_POST['builder_nonce'];
    if(! wp_verify_nonce( $nonce, 'builder_nonce'))
      die( 'Nope!');

    if( isset($_POST['post_id']) && !empty($_POST['post_id']) ){
      $post_id = $_POST['post_id'];
      unset($_POST['post_id']);
      unset($_POST['builder_nonce']);

      if( isset($_POST['save']) && !empty($_POST['save']) ){
        $shortcodeKey = $_POST['shortcodeKey'];
        $metakey = '_reactive_builder_'.$shortcodeKey;
        $allLayout = get_post_meta($post_id,$metakey, true);
        if( isset($_POST['save']['postTypes']) ){
          $postTypes = $_POST['save']['postTypes'];
        }
        if( !isset($postTypes) ) $postTypes = 'post';
        $loaded_data = array();
        $metadata = array();
        if( !empty($allLayout) ){
         $save = $_POST['save'];

         foreach ($allLayout as &$layout) {
           if( isset($save) && is_array($save) && !empty($save) ){
              foreach ($save as $key => $value) {
                $layout[$key] = $value;
              }
           }
         }

         $uid = $_POST['uid'];
         $loaded_data = $this->load_helper_data($shortcodeKey, $postTypes, $allLayout, $save, $uid );
        }
        update_post_meta($post_id,$metakey, $allLayout);
        echo json_encode($loaded_data);
      }else{
        echo json_encode(array());
      }
    }
    wp_die();
  }

  public function load_helper_data($shortcodeKey, $postTypes, $allLayout, $save = array() ) {
    $loaded_data = array();
    $metadata = array();
    $numberOfPosts = '10';
    $transient_value = get_transient('reactive_builder-'.$postTypes);
    $is_ajax = get_post_meta( $shortcodeKey, 'rebuilder_async', true ) === 'ajax' ? true: false;
    $loaded_data[$shortcodeKey] = $transient_value;

    // getting number of posts
    foreach ($allLayout as $layout) {
      if (isset($layout['numberOfPosts'])) {
        $numberOfPosts = $layout['numberOfPosts'];
      }
    }
    //  need to use transient in here.
    foreach ($allLayout as $layout) {
        if( isset($layout['searchAttr']) && !empty($layout['searchAttr']) ) {
          foreach ($layout['searchAttr'] as $search) {
              if( isset($search['selectedMetakey']) ){
                $search_metakey = $search['selectedMetakey'];
                $metadata[$search_metakey] = $this->get_meta_values($search_metakey, $postTypes);
              }
          }
        }
        $loaded_data[$shortcodeKey]['helperData'] = array_merge( $loaded_data[$shortcodeKey]['helperData'] , array('metadata' => $metadata) );
        $loaded_data[$shortcodeKey]['previewData']  = $this->get_filtered_data(array(
          'postTypes' => $postTypes,
          'numberOfPosts' => $numberOfPosts,
          'tax_query' => array(),
          'meta_query' => array(),
          'pageNumber'=> '1',
          'sort_data' => null,
          'async' => $is_ajax,
        ));
        $loaded_data[$shortcodeKey]['layoutData']  = $allLayout;
    }
    return $loaded_data;
  }


  public function add_search_element()
  {
    $nonce = $_POST['builder_nonce'];
    if(! wp_verify_nonce( $nonce, 'builder_nonce'))
      die( 'Nope!');

    if( isset($_POST['post_id']) && !empty($_POST['post_id']) ){
      $post_id = $_POST['post_id'];
      unset($_POST['post_id']);
      unset($_POST['builder_nonce']);
      $allSearchAttr = get_post_meta();
    }
    echo json_encode($_POST);
    wp_die();
  }


  public function get_type($urlkey, $post_type) {
    $type = '';
    $taxonomies = $this->get_all_taxonomies( $post_type );


    if (in_array($urlkey, $taxonomies)) {
      return 'taxonomies';
    }

    return $type;
  }

  public function get_attribute($urlkey, $search_stack) {
    $viewType = '';
    foreach ($search_stack as $stack) {
      if ($stack['metakey'] === $urlkey) {
        $type = isset($stack['viewType']) ? $stack['viewType'] : null;
      }
    }

    return $viewType;
  }

  public function make_taxonomy_query( $post_type, $terms ) {
    $all_terms = array();
    if ( is_array($terms) ) {
      foreach ($terms as $term) {
        $all_terms[] = $this->get_term_by_slug($term);
      }
    } else {
        $all_terms[] = $this->get_term_by_slug($terms);
    }

    $parents = array();
    $singles = array();
    $build_query = array();
    $tax_query = array();
    $single_parent = array();
    $taxonomy = null;

    $tax_query['relation'] = 'OR';
    if (!empty($all_terms))
    foreach ($all_terms as $term) {
      $taxonomy = $term->taxonomy;
      if ($term->parent) {
        if (!isset($parents[$term->parent]) ) {
          $parents[$term->parent] = array();
        }
        $parents[$term->parent][] = $term->slug;
      } else {
        $singles[] = $term;
      }
    }

    if (!empty($singles)) {
      foreach ($singles as $term) {
        if(!isset($parents[$term->term_id]) ) {
          $single_parent[] = $term->slug;
        }
      }
    }

    if (!empty($single_parent)) {
      $tax_query[] = array(
        'taxonomy' => $taxonomy,
        'field'    => 'slug',
        'terms'    => $single_parent,
      );
    }


    foreach ($parents as $parent) {
      $build_query['relation'] = 'OR';
      $build_query[] = array(
        'taxonomy' => $taxonomy,
        'field'    => 'slug',
        'terms'    => $parent,
      );
    }

    if( !empty($build_query))
      $tax_query[] = $build_query;

    return $tax_query;

  }

  public function filter_data() {

    $nonce = $_POST['builder_nonce'];
    if(! wp_verify_nonce( $nonce, 'builder_nonce'))
      die( 'Nope!');

    $result = array();

    if (isset($_POST['post_type'])) {
      $text_search = '';
      $post_type = $_POST['post_type'];
      $numberOfPosts = $_POST['numberOfPosts'];
      $pageNumber = $_POST['pageNumber'];
      $search_stack = isset($_POST['search_stack']) ? $_POST['search_stack'] : array();
      $url_data = isset($_POST['url_data']) ? $_POST['url_data']: array();
      $rangekeys = isset( $_POST['rangekeys']) ? $_POST['rangekeys'] : array();
      $sort_data = isset( $_POST['sortData']) ? $_POST['sortData'] : array();

      $tax_query = array();
      $meta_query = array();
      $location = false;

      if ( !empty($url_data) ) {
        foreach ($url_data as $key => $url) {
          if ( $this->get_type($key, $post_type) === 'taxonomies') {

            $tax_query['relation'] = 'AND';
            $tax_query[] = $this->make_taxonomy_query($post_type, $url);

          } else if ($key === 'search_item') {
            $text_search = $url;
          } else if ($key === 'location') {

            $geocode = $this->get_latlang($url);
            if (!empty($geocode)) {
              $location = $geocode;
            }

          } else {
            // check for start, end , max , min
            $meta_query['relation'] = 'AND';

            if (strpos($key, '[') !== false) {

            } else {
              if (is_array($url)) {
                $build = array();
                $build['relation'] = 'OR';
                foreach ($url as $url_data) {
                  $build[] = array(
                    'key'     => $key,
                    'value'   => $url_data,
                    'compare' => '=',
                  );
                }
                $meta_query[] = $build;
              } else {
                $meta_query[] = array(
                  'key'     => $key,
                  'value'   => $url,
                  'compare' => '=',
                );
              }
            }
          }
        }
      }

      if (!empty($rangekeys)) {
        foreach ($rangekeys as $meta) {
          if ($meta['metakey']) {
            $meta_query[] = array(
              'key'     => isset($meta['metakey']) ? $meta['metakey']: null ,
              'value'   => isset($meta['values']) ? $meta['values']: null ,
              'type'    => 'numeric',
              'compare' => 'BETWEEN',
            );
          }
        }
      }

      $options = array(
        'postTypes' => $post_type,
        'numberOfPosts' => $numberOfPosts,
        'tax_query' => $tax_query,
        'meta_query' => $meta_query,
        'pageNumber' => $pageNumber,
        'sort_data' => $sort_data,
        'async' => true,
        'text_search' => $text_search,
      );

      if ( $location ) {
        $this->location = $location;
        add_filter( 'posts_where' , array($this, 'location_posts_where') );
      }
      $posts = $this->get_filtered_data($options);
      if ( $location ) {
        $this->location = $location;
        remove_filter( 'posts_where' , array($this, 'location_posts_where') );
      }
     echo json_encode(array( 'posts' => $posts ));
    }

    wp_die();
  }

  public function load_sidebar() {
    $nonce = $_POST['builder_nonce'];
    if(! wp_verify_nonce( $nonce, 'builder_nonce'))
      die( 'Nope!');
    global $wp_registered_sidebars;
    $sidebar_name = $_POST['name'];
    $load = new Re_Template();
    $template = $load->locate_template('sidebar/sidebar.php');
    include_once($template);
    wp_die();
  }

  public function get_latlang($address) {
    $reactive_settings = get_option('reactive_settings', true);
    if( isset( $reactive_settings['gmap_api_key'] ) && !empty( $reactive_settings['gmap_api_key'] ) ) {
      $url = 'https://maps.googleapis.com/maps/api/geocode/json?key='
        . $reactive_settings['gmap_api_key']
        . '&address='.urlencode($address) ;

      $http = new \WP_Http();
      $request = $http->request($url);
      if( $request && !isset( $request->errors ) ) {
        $response = $request[ "body" ];
        $geo = json_decode( $response );
        if (isset($geo) && !empty($geo)) {
        $this->geoData = $geo->results[0];
        $location = $geo->results[ 0 ]->geometry->location;
        return $location;
        }
      }
    } else {
      return array();
    }
  }


  public function location_posts_where($where) {
    global $wpdb;
    $lat = $this->location->lat;
    $lng = $this->location->lng;
    $radius = 100; // should be dynamic
    if( in_array('country', $this->geoData->types) && in_array('political', $this->geoData->types) ) {
      $where .= " AND $wpdb->posts.ID in
        (SELECT id FROM {$wpdb->prefix}re_lat_lng WHERE
        country='".$this->geoData->formatted_address ."')";
    } else {
      $where .= " AND $wpdb->posts.ID IN (SELECT id FROM {$wpdb->prefix}re_lat_lng WHERE
           ( 3959 * acos( cos( radians(" . $lat . ") )
                          * cos( radians( lat ) )
                          * cos( radians( lng )
                          - radians(" . $lng . ") )
                          + sin( radians(" . $lat . ") )
                          * sin( radians( lat ) ) ) ) <= " . $radius . ")";
    }
    return $where;
  }

}
