<?php

namespace Reactive\Admin;
use Reactive\App\Reuse;

/**
 * Class Re_Admin_Scripts
 * @package Reactive\Admin
 */
class Re_Admin_Scripts{


  protected function custom_scripts(){
    $geobox_post_type_scripts = [];
    $scripts = array(
      array(
  			'key'	=> 'reactive_page_reactive_geobox',
  			'value'	=> 're_geoboxSettings',
  		),
      array(
  			'key'	=> 'reactive_page_reactive_settings',
  			'value'	=> 're_generalSettings',
  		),
      array(
  			'key'	=> 'reactive_builder',
  			'value'	=> 're_builder',
  		),
      array(
  			'key'	=> 'reactive_page_meta_restrictions',
  			'value'	=> 're_metaRestrictions',
  		),
      array(
  			'key'	=> 're_grid_shortcode',
  			'value'	=> 're_gridBuilder',
  		),
    );
    $geobox_post_types = get_option('_reactive_geobox_settings', true);
    $geobox_post_types = json_decode(stripslashes_deep($geobox_post_types));
    $geobox_post_types_array = $geobox_post_types !='1' && $geobox_post_types->geobox_post_type_select !='' ? explode(',', $geobox_post_types->geobox_post_type_select) : [];
    foreach ($geobox_post_types_array as $key => $post_type) {
      $geobox_post_type_scripts[] = array(
        'key' => $post_type,
        'value' => 're_geoboxPreview',
      );
    }

    $merged_custom_scripts = array_merge($scripts, $geobox_post_type_scripts);

    return $merged_custom_scripts;

  }

	/**
	 * class constructor
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 * @return null
	 */
	public function __construct(){

		add_action('admin_enqueue_scripts', array( $this , 're_admin_load_scripts' ) );
  //  add_filter('script_loader_tag', array($this, 'add_custom_attribute' ), 10, 2);
  //  add_filter('reactive_generator_localize_args', array($this, 'reactive_generator_localize_args_func' ));

	}

	/**
	 * admin script loading
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 * @param $hook
	 * @return null
	 */
	public function re_admin_load_scripts($hook) {
    $info = get_current_screen();
    wp_register_script( 'reuse-form-variable',RE_VEN.'reuse-form-variable.js', array('jquery'), $ver = true, false);
    wp_enqueue_script( 'reuse-form-variable' );

    if($info->post_type === 'reactive_grid' || $info->post_type === 'reactive_category' || $info->post_type === 'reactive_map_marker' || $info->post_type === 'reactive_map_info' || $info->post_type === 're_preview_popup' || $info->post_type === 're_grid_shortcode' || $info->post_type === 'autosearch_template'){
      wp_register_script( 'codemirror',RE_VEN.'codemirror.js', array('jquery'), $ver = true, false);
      wp_enqueue_script( 'codemirror' );
      wp_register_style( 'codemirror',RE_VEN.'codemirror.css', array(), $ver = false, $media = 'all');
      wp_enqueue_style( 'codemirror' );
      wp_register_script( 'codemirror-js-mode',RE_VEN.'javascript.js', array('jquery'), $ver = true, false);
      wp_enqueue_script( 'codemirror-js-mode' );
      wp_register_style( 'codemirror-theme',RE_VEN.'seti.css', array(), $ver = false, $media = 'all');
      wp_enqueue_style( 'codemirror-theme' );
      wp_register_script( 'grid-template-data',RE_VEN.'grid-template-data.js', array('jquery'), $ver = true, false);
      wp_enqueue_script( 'grid-template-data' );
    }

      wp_register_style('re-flexbox', RE_VEN.'flexboxgrid.css', array(), $ver = false, $media = 'all');
      wp_enqueue_style('re-flexbox');
    wp_register_style('reactive-admin-css', RE_VEN.'reactive-admin-settings.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('reactive-admin-css');
    // start shortcode clipboard
    wp_register_script( 'highlight-pack-js',RE_VEN.'highlight.pack.min.js', array('jquery'), $ver = true, true);
    wp_enqueue_script( 'highlight-pack-js' );
    wp_register_script( 'clipboardjs','//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.12/clipboard.min.js', array('jquery'), $ver = true, true);
    wp_enqueue_script( 'clipboardjs' );
    wp_register_style('shortcode-admin-css', RE_VEN.'shortcode-admin.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('shortcode-admin-css');
    wp_register_script( 'shortcode-admin-js', RE_VEN.'shortcode-admin.js', array('jquery'), false, true );
    wp_enqueue_script( 'shortcode-admin-js');
    // end shortcode clipboard
    wp_register_script( 'react', RE_VEN.'react.min.js', array(), $ver = true, true);
    wp_enqueue_script( 'react' );

    wp_register_script( 'react-dom', RE_VEN.'react-dom.min.js', array(), $ver = true, true);
    wp_enqueue_script( 'react-dom' );

    wp_register_style('reuse-form', RE_CSS.'/reuse-form.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('reuse-form');

    // if( $hook === 'post-new.php' || $hook === 'post.php' ) {
    //   $reactive_settings = get_option('reactive_settings', true);
    //   if( isset( $reactive_settings['gmap_api_key'] ) && !empty( $reactive_settings['gmap_api_key'] ) ) {
    //     wp_enqueue_script('google-map-api', '//maps.googleapis.com/maps/api/js?key='.$reactive_settings["gmap_api_key"].'&libraries=places,geometry&language=en-US' , true , false );
    //   }
    //
    //   wp_register_script( 're-geobox',RE_JS.'geobox.js', array('jquery'), $ver = true, true);
    //   wp_enqueue_script( 're-geobox' );
    // }
    //
    // if( $hook === 'reactive_page_reactive_settings' || $hook === 'reactive_page_reactive_addons' ) {
    //   wp_register_style('re-select2', RE_CSS.'/select2.min.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('re-select2');
    //
    //   wp_register_script( 're-select2',RE_JS.'select2.min.js', array('jquery'), $ver = true, true);
    //   wp_enqueue_script( 're-select2' );
    //
    //
    //   wp_register_style('re-settings', RE_CSS.'/settings.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('re-settings');
    //
    //   wp_register_style('re-flexbox', RE_CSS.'/flexbox.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('re-flexbox');
    //
    //   wp_register_style('re-admin-style', RE_CSS.'/admin.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('re-admin-style');
    //
    //   wp_register_script( 're-settings',RE_JS.'settings.js', array('jquery'), $ver = true, true);
    //   wp_enqueue_script( 're-settings' );
    //
    // }
    //
    // wp_register_script( 're-admin-alert',RE_JS.'admin-alert.js', array('jquery'), $ver = true, true);
    // wp_enqueue_script( 're-admin-alert' );
    // wp_localize_script( 're-admin-alert', 'REACTIVE_ADMIN_ALERT', array(
    //   'indexing_builder_nonce' => wp_create_nonce( 'indexing_builder_nonce' ),
    //   'ajaxurl' => admin_url('admin-ajax.php'),
    //   'spinner' => admin_url('images/spinner.gif'),
    // ));
    //
		// $restricted_page = array(
    //   'toplevel_page_reactive_admin'
    // );
		// if( in_array($hook, $restricted_page) ){
    //
		// 	wp_register_style('simple-line-icons-style', RE_CSS.'/simple-line-icons.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('simple-line-icons-style');
    //
    //   wp_register_style('re-admin-style', RE_CSS.'/admin.css', array(), $ver = false, $media = 'all');
    //   wp_enqueue_style('re-admin-style');
    //
		// 	wp_register_script( 're-backend',RE_JS.'backend.js', array('jquery'), $ver = true, true);
		// 	wp_enqueue_script( 're-backend' );
    //
    //   $lang = array(
    //     'SAVE' => esc_html__('Save', 'reactive'),
    //     'PLEASE_SELECT_POST_TYPE_FOR_DATA_RESTRICTION' => esc_html__('Please select post types for data restriction', 'reactive'),
    //     'PLEASE_SELECT_A_POST_TYPE' => esc_html__('Please select a post type', 'reactive'),
    //     'ADD_POST_TYPES' => esc_html__('Add Post Types', 'reactive'),
    //     'ADMIN_ALERT_MESSAGE' => __("Select any checkbox inside the accoirdion for restricting data from front-end search panel. If you enable a checkbox this will automatically restrict your private data from the search panel, you don't want to share. e.g. for woocommerce you will need to disable the '_file_paths' for downloadable products.", 'reactive'),
    //   );
    //
    //   wp_localize_script( 're-backend', 'REACTIVE_ADMIN', array(
    //     'builder_nonce' => wp_create_nonce( 'builder_nonce' ),
    //     'ajaxurl' => admin_url('admin-ajax.php'),
    //     'helper' => array(
    //       'all_post_types' => $this->re_get_all_post_types()
    //     ),
    //     'LANG' => $lang,
    //   ));
		// }
    //


    # ADMIN JS LOADING
    $this->re_load_reuse_form_scripts();
    $this->load_reactive_scripts();

  }

  public function re_load_reuse_form_scripts(){
    if ( !is_plugin_active( 'redq-reuse-form/redq-reuse-form.php' ) ) {
      wp_register_style('reuse-form-two', RE_REUSE_FORM_CSS.'reuse-form-two.css', array(), $ver = false, $media = 'all');
      wp_enqueue_style('reuse-form-two');
      wp_register_style('reuse-form', RE_REUSE_FORM_CSS.'reuse-form.css', array(), $ver = false, $media = 'all');
      wp_enqueue_style('reuse-form');
      $reuse_form_scripts = new Reuse;
      $webpack_public_path = get_option('webpack_public_path_url', true);
      if (file_exists($webpack_public_path)) {
        $reuse_form_scripts->load($webpack_public_path);
      }
    }
  }

  // public function reactive_generator_localize_args_func($args){
  //   $args['builder_nonce'] = wp_create_nonce( 'builder_nonce' );
  //   $args['ajaxurl'] = admin_url('admin-ajax.php');
  //   $args['helper'] = array(
  //     'all_post_types' => $this->redq_get_all_posts(),
  //     'all_taxonomies' => $this->redq_get_all_taxonomies(),
  //     'all_metakeys'   => $this->redq_get_all_meta_keys(),
  //   );
  //   $args['LANG'] = $this->redq_admin_language();
  //   $args['ERROR_MESSAGE'] = null;
  //
  // }

  public function load_reactive_scripts() {
    // All other assets
    $reactive_admin_scripts = json_decode(file_get_contents( RE_FILE . "/resource/admin-assets.json"),true);
    $all_scripts = array();
		$all_scripts = $this->current_scripts();
    foreach ($reactive_admin_scripts as $filename => $file) {
      if (in_array($filename, $all_scripts)) {
        wp_register_script( $filename, RE_JS. $file['js'] , array('jquery', 'underscore'), $ver = false, true);
        wp_enqueue_script( $filename );
        wp_localize_script( $filename, 'REACTIVE_AJAX_DATA', array(
          'nonce' => wp_create_nonce( 'reactive_ajax_nonce' ),
           'admin_url' => admin_url('admin-ajax.php'),
           'helper' => array(
             'all_post_types' => $this->redq_get_all_posts(),
             'all_taxonomies' => $this->redq_get_all_taxonomies(),
             'all_metakeys'   => $this->redq_get_all_meta_keys(),
           ),
          'LANG'          => $this->redq_admin_language(),
          'ERROR_MESSAGE' => null,
          'ERROR_MESSAGE' => null,
        ) );
      }
    }
  }

  // dynamically load
	public function current_scripts() {
		$info = get_current_screen();
		$current_screen = null;
		if($info->base == 'post' || $info->base == 'term' ){
      $current_screen = $info->post_type;
    }
		elseif ($info->post_type == null){
      $current_screen = $info->base; // take the base when it's a page or options
    }
		$all_scripts = [];
		$custom_scripts = $this->custom_scripts();
		foreach ($custom_scripts as $script_name) {
      if ($current_screen == $script_name['key']) {
        array_push($all_scripts, $script_name['value']);
      }
		}
		return $all_scripts;
	}


  public function redq_admin_language() {
		/**
		 * Localize language files for js rendering
		 */
		$lang = array(
			'POST_TYPE' => __('Post Type', 'scholarwp'),
			'PLEASE_SELECT_ANY_POST_TYPE_YOU_WANT_TO_ADD_THIS_TAXONOMY' => __('Please select any post type you want to add this taxonomy', 'scholarwp'),
			'ENABLE_HIERARCHY' => __('Enable Hierarchy', 'scholarwp'),
			'IF_YOU_WANT_TO_ENABLE_THE_TAXONOMY_HIERARCHY_SET_TRUE' => __('If you want to enable the taxonomy hierarchy set true', 'scholarwp'),
			'POST_FORMATS' => __('Post Formats', 'scholarwp'),
			'ENABLE_POST_FORMATS_INTO_THIS_POST' => __('Enable post formats into this post.', 'scholarwp'),
			'PAGE_ATTRIBUTES' => __('Page Attributes', 'scholarwp'),
			'ENABLE_PAGE_ATTRIBUTES_INTO_THIS_POST' => __('Enable page attributes into this post.', 'scholarwp'),
			'REVISIONS' => __('Revisions', 'scholarwp'),
			'ENABLE_REVISIONS_INTO_THIS_POST' => __('Enable revisions into this post.', 'scholarwp'),
			'COMMENTS' => __('Comments', 'scholarwp'),
			'ENABLE_COMMENTS_INTO_THIS_POST' => __('Enable comments into this post.', 'scholarwp'),
			'CUSTOM_FIELDS' => __('Custom Fields', 'scholarwp'),
			'ENABLE_CUSTOM_FIELDS_INTO_THIS_POST' => __('Enable custom fields into this post.', 'scholarwp'),
			'TRACKBACKS' => __('Trackbacks', 'scholarwp'),
			'ENABLE_TRACKBACKS_INTO_THIS_POST' => __('Enable trackbacks into this post.', 'scholarwp'),
			'EXCERPT' => __('Excerpt', 'scholarwp'),
			'ENABLE_EXCERPT_INTO_THIS_POST' => __('Enable excerpt into this post.', 'scholarwp'),
			'THUMBNAIL' => __('Thumbnail', 'scholarwp'),
			'ENABLE_THUMBNAIL_INTO_THIS_POST' => __('Enable thumbnail into this post.', 'scholarwp'),
			'AUTHOR' => __('Author', 'scholarwp'),
			'ENABLE_AUTHOR_INTO_THIS_POST' => __('Enable author into this post.', 'scholarwp'),
			'EDITOR' => __('Editor', 'scholarwp'),
			'ENABLE_EDITOR_INTO_THIS_POST' => __('Enable editor into this post.', 'scholarwp'),
			'TITLE' => __('Title', 'scholarwp'),
			'ENABLE_TITILE_INTO_THIS_POST' => __('Enable title into this post.', 'scholarwp'),
			'ALL_ITEMS' => __('All Items', 'scholarwp'),
			'SINGULAR_NAME' => __('Singular Name', 'scholarwp'),
			'POST_SLUG' => __('Post Slug', 'scholarwp'),
			'IF_WANT_TO_CHANGE_THE_DEFAULT_ALL_ITEMS_NAME_ADD_THE_NAME_HERE' => __('If want to change the default all items name, add the name here', 'scholarwp'),
			'IF_WANT_TO_CHANGE_THE_DEFAULT_SINGULAR_NAME_ADD_THE_NAME_HERE' => __('If want to change the default singular name, add the name here', 'scholarwp'),
			'IF_WANT_TO_CHANGE_THE_DEFAULT_POST_SLUG_ADD_THE_NAME_HERE' => __('If want to change the default post slug, add the slug here', 'scholarwp'),
			'MENU_POSITION' => __('Menu Position', 'scholarwp'),
			'SELECT_THE_POST_TYPE_MENU_POSITION' => __('Select the post type menu position.', 'scholarwp'),
			'MENU_ICON' => __('Menu Icon', 'scholarwp'),
			'SELECT_MENU_ICON' => __('Select a menu icon.', 'scholarwp'),
			'BELOW_FIRST_SEPARATOR' => __('Below First Separator', 'scholarwp'),
			'BELOW_POSTS' => __('Below Posts', 'scholarwp'),
			'BELOW_MEDIA' => __('Below Media', 'scholarwp'),
			'BELOW_LINKS' => __('Below Links', 'scholarwp'),
			'BELOW_PAGES' => __('Below Pages', 'scholarwp'),
			'BELOW_COMMENTS' => __('Below Comments', 'scholarwp'),
			'BELOW_SECOND_SEPARATOR' => __('Below Second Separator', 'scholarwp'),
			'BELOW_PLUGINS' => __('Below Plugins', 'scholarwp'),
			'BELOW_USERS' => __('Below Users', 'scholarwp'),
			'BELOW_TOOLS' => __('Below Tools', 'scholarwp'),
			'BELOW_SETTINGS' => __('Below Settings', 'scholarwp'),
			'DEFAULT_ICON' => __('Default Icon', 'scholarwp'),
			'UPLOAD_ICON' => __('Upload Icon', 'scholarwp'),
			'ICON_TYPE' => __('Icon Type', 'scholarwp'),
			'SELECT_THE_DEFAULT_ICON_TYPE_OR_UPLOAD_A_NEW' => __('Select the default icon type or upload a new.', 'scholarwp'),
			'UPLOAD_CUSTOM_ICON' => __('Upload Custom Icon', 'scholarwp'),
			'YOU_CAN_UPLOAD_ANY_CUSTOM_IMAGE_ICON' => __('You can upload any custom image icon.', 'scholarwp'),
      'BUNDLE_COMPONENT' => __('Bundle Component', 'scholarwp'),
      'PICK_COLOR' => __('Pick Color','scholarwp'),
      'NO_RESULT_FOUND' => __('No result found', 'scholarwp'),
      'SEARCH' => __('search','scholarwp'),
      'OPEN_ON_SELECTED_HOURS' => __('Open on selected hours', 'scholarwp'),
      'ALWAYS_OPEN' => __('Always open', 'scholarwp'),
      'NO_HOURS_AVAILABLE' => __('No hours available', 'scholarwp'),
      'PERMANENTLY_CLOSE' => __('Permanently closed', 'scholarwp'),
      'MONDAY' => __('Monday', 'scholarwp'),
      'TUESDAY' => __('Tuesday', 'scholarwp'),
      'WEDNESDAY' => __('Wednesday', 'scholarwp'),
      'THURSDAY' => __('Thursday', 'scholarwp'),
      'FRIDAY' => __('Friday', 'scholarwp'),
      'SATURDAY' => __('Saturday', 'scholarwp'),
      'SUNDAY' => __('Sunday', 'scholarwp'),
      'WRONG_PASS' => __('Wrong Password', 'scholarwp'),
      'PASS_MATCH' => __('Password Matched', 'scholarwp'),
      'CONFIRM_PASS' => __('Confirm Password', 'scholarwp'),
      'CURRENTLY_WORK' => __('I currently work here', 'scholarwp'),
		);

		return $lang;
	}


  public function re_get_all_post_types(){
    $post_types = get_post_types( array('public'=> true ) , 'names', 'and' );
    $all_types = array();
    foreach ($post_types as $type) {
      $all_types[] = $type;
    }

    return $all_types;
  }


  public function add_custom_attribute($tag, $handle) {
    foreach($this->custom_scripts as $script) {
       if ($script === $handle) {
          return str_replace(' src', ' defer="defer" src', $tag);
       }
    }
    // vendor
    if ($handle === 're_admin_vendor') {
      return str_replace(' src', ' defer="defer" src', $tag);
    }
    // if needed add async in here as defer
    return $tag;
  }

  public function redq_get_all_taxonomies() {
    $restricted_taxonomies = array(
      'nav_menu',
      'link_category',
      'post_format',
    );
    $args = array();
    $output = 'objects'; // or objects
    $operator = 'or'; // 'and' or 'or'
    $taxonomies = get_taxonomies( $args, $output, $operator );
    $formatted_taxonomies = array();
    if ( $taxonomies ) {
      foreach ( $taxonomies  as $key => $taxonomy ) {
        if( !in_array($key, $restricted_taxonomies) ) {
            // $formated_taxonomy_name = ucfirst($taxonomy->object_type[0]). ' '.$taxonomy->labels->singular_name;
            $formatted_taxonomies[$taxonomy->name] = $taxonomy->name;
        }
      }
    }
    return $formatted_taxonomies;
  }
  public function redq_get_all_posts() {
      $restricted_post_types = array(
        // 'attachment',
        'scholar_faq',
        'scholar_template',
        'scholar_component',
        'scholar_taxonomy',
        'scholar_term_metabox',
        'scholar_metabox',
        'scholar_form_builder',
        'scholar_plan',
        'redq_rb_post',
        'scholar_post_type',
        'reactive_builder',
      );
      $args = array(
         'public'   => true,
      );
      $output = 'objects'; // 'names' or 'objects' (default: 'names')
      $operator = 'and'; // 'and' or 'or' (default: 'and')
      $post_types = get_post_types( $args, $output, $operator );
      $formatted_post_types = array();
      foreach($post_types as $key => $post_type) {
        if( !in_array($key, $restricted_post_types) ) {
            $formatted_post_types[$post_type->name] = $post_type->labels->singular_name;
        }
      }
      return $formatted_post_types;
  }
  /**
   * @param string [comma seperated]
   *
   */
  public function redq_get_all_meta_keys() {
    $all_post_types = array();
    $all_post_types = $this->redq_get_all_posts();
    $post_types = array_keys($all_post_types);
    $bp_group_meta = [];
    $bp_activity_meta = [];
    global $wpdb;
    $generate = '';
    $all_keys = array();
    $post_type_placeholder = implode(', ', array_fill(0, count($post_types), '%s'));
    // foreach ($all_post_types as $post_type => $post_name ) {
      $query = $wpdb->prepare("SELECT DISTINCT pm.meta_key FROM {$wpdb->posts} post INNER JOIN
        {$wpdb->postmeta} pm ON post.ID = pm.post_id WHERE post.post_type IN ($post_type_placeholder)",$post_types);
      $result = $wpdb->get_results($query , 'ARRAY_A');
      if( !empty($result) ){
        foreach ($result as $res) {
          if(!in_array($res['meta_key'], $all_keys) ){
            $all_keys[$res['meta_key']] = $res['meta_key'];
          }
        }
      }
    // }
    $user_query = $wpdb->prepare("SELECT DISTINCT meta_key FROM {$wpdb->usermeta} WHERE meta_key <> %s", '');
    $user_meta_keys = $wpdb->get_results($user_query , 'ARRAY_A');
    $all_user_meta_keys = [];
    if( !empty($user_meta_keys) ){
      foreach ($user_meta_keys as $res) {
        if(!in_array($res['meta_key'], $all_user_meta_keys) ){
          $all_user_meta_keys[$res['meta_key']] = $res['meta_key'];
        }
      }
    }
    $review_query = $wpdb->prepare("SELECT DISTINCT meta_key FROM {$wpdb->commentmeta} WHERE meta_key <> %s", '');
    $review_meta_keys = $wpdb->get_results($review_query , 'ARRAY_A');
    $all_review_meta_keys = [];
    if( !empty($review_meta_keys) ){
      foreach ($review_meta_keys as $res) {
        if(!in_array($res['meta_key'], $all_review_meta_keys) ){
          $all_review_meta_keys[$res['meta_key']] = $res['meta_key'];
        }
      }
    }
    if(is_plugin_active( 'buddypress/bp-loader.php' )){
      $bp_group_query = $wpdb->prepare("SELECT DISTINCT meta_key FROM {$wpdb->prefix}bp_groups_groupmeta WHERE meta_key <> %s", '');
      $bp_group_meta_keys = $wpdb->get_results($bp_group_query , 'ARRAY_A');
      $bp_group_meta = [];
      if( !empty($bp_group_meta_keys) ){
        foreach ($bp_group_meta_keys as $res) {
          if(!in_array($res['meta_key'], $bp_group_meta) ){
            $bp_group_meta[$res['meta_key']] = $res['meta_key'];
          }
        }
      }
      // $bp_activity_query = $wpdb->prepare("SELECT DISTINCT meta_key FROM {$wpdb->prefix}bp_activity_meta WHERE meta_key <> %s", '');
      // $bp_activity_meta_keys = $wpdb->get_results($bp_activity_query , 'ARRAY_A');
      $bp_activity_meta = [];
      // if( !empty($bp_activity_meta_keys) ){
      //   foreach ($bp_activity_meta_keys as $res) {
      //     if(!in_array($res['meta_key'], $bp_activity_meta) ){
      //       $bp_activity_meta[$res['meta_key']] = $res['meta_key'];
      //     }
      //   }
      // }
    }
    return array_merge($all_keys, $all_user_meta_keys, $all_review_meta_keys, $bp_group_meta, $bp_activity_meta);
  }

  public function redq_get_all_pages() {
    $page_ids=get_all_page_ids();
    $formatted_pages = array();
    foreach ($page_ids as $page) {
      $title = get_the_title($page);
      $post = get_post($page);
      $formatted_pages[$post->post_name] = $title;
    }
    return $formatted_pages;
  }

}
