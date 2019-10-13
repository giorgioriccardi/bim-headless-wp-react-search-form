<?php

namespace Reactive\App;
class Scripts {
  protected $custom_scripts = array(
    're_base',
    're_preview'
  );

  public function __construct() {
    add_action('wp_enqueue_scripts', array($this , 'load_frontend_scripts' ));
    add_filter('script_loader_tag', array($this, 'add_custom_attribute' ), 10, 2);
  }

  public function load_frontend_scripts() {
    global $post;
      wp_register_script( 'reuse-form-variable-reactive', RE_VEN.'reuse-form-variable.js', array(), $ver = true, false);
      wp_enqueue_script( 'reuse-form-variable-reactive' );
      wp_register_style('flexbox-grid-css', RE_VEN.'flexboxgrid.css', array(), $ver = false, $media = 'all');
      wp_register_style('grid-layout', RE_VEN.'grid-layout.css', array(), $ver = true, $media = 'all');
      wp_register_script( 'react', RE_VEN.'react.min.js', array(), $ver = true, true);
      wp_register_script( 'react-dom', RE_VEN.'react-dom.min.js', array(), $ver = true, true);
      wp_register_script( 'nicescroll_js', '//cdn.jsdelivr.net/jquery.nicescroll/3.6.8/jquery.nicescroll.min.js', array(), $ver = true, false);
      wp_register_style('owlcarousel_css', RE_VEN.'owl.carousel.min.css', array(), $ver = false, $media = 'all');
      wp_register_style('owlcarousel-theme-css', RE_VEN.'owl.theme.default.min.css', array(), $ver = false, $media = 'all');
      wp_register_script( 'owlcarousel_js', RE_VEN.'owl.carousel.min.js', array(), $ver = true, false);
      wp_register_style('magnific-popup-css', RE_VEN.'magnific-popup.css', array(), $ver = false, $media = 'all');
      wp_register_script( 'magnific-popup-js', RE_VEN.'jquery.magnific-popup.min.js', array(), $ver = true, false);
      wp_register_style('autosearch-css', RE_VEN.'reactive-autosearch.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridavada-css', RE_VEN.'gridavada.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridginie-css', RE_VEN.'gridginie.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridUncode-css', RE_VEN.'gridUncode.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridUncodeAlt-css', RE_VEN.'gridUncodeAlt.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridproduct-css', RE_VEN.'gridproduct.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridsimple-css', RE_VEN.'gridsimple.css', array(), $ver = false, $media = 'all');
      wp_register_style('gridsimple-css', RE_VEN.'gridsimple.css', array(), $ver = false, $media = 'all');
      wp_register_style('bbGroupGrid-css', RE_VEN.'bbGroupGrid.css', array(), $ver = false, $media = 'all');
      wp_register_style('userGrid-css', RE_VEN.'userGrid.css', array(), $ver = false, $media = 'all');
      wp_register_style('reviewGrid-css', RE_VEN.'reviewGrid.css', array(), $ver = false, $media = 'all');
      wp_register_script( 'gridTemplate-js', RE_VEN.'gridTemplate.js', array('jquery', 'underscore'), $ver = true, false);
      wp_register_style('reactive-front-one', RE_CSS.'/reactive-front.css', array(), $ver = false, $media = 'all');
      wp_register_style('reactive-front-two', RE_CSS.'/reactive-front-two.css', array(), $ver = false, $media = 'all');
      wp_register_style('reactive-popover', RE_VEN.'/reactive-popover.css', array(), $ver = false, $media = 'all');
      wp_register_style('ionicons',
        'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css',
        array(), $ver = false, $media = 'all');
      wp_register_script('OverlappingMarkerSpiderfier', RE_VEN.'OverlappingMarkerSpiderfier.js', array(), $ver = false, $media = 'all');
    // $grid_posts = get_posts(array('post_type' => 'reactive_grid', 'posts_per_page' => '-1'));
    // $category_posts = get_posts(array('post_type' => 'reactive_category', 'posts_per_page' => '-1'));
    // $map_markers = get_posts(array('post_type' => 'reactive_map_marker', 'posts_per_page' => '-1'));
    // $map_infos = get_posts(array('post_type' => 'reactive_map_info', 'posts_per_page' => '-1'));
    // $preview_popups = get_posts(array('post_type' => 're_preview_popup', 'posts_per_page' => '-1'));

  $all_templates = get_posts(
    array(
      'post_type' => array(
        're_preview_popup', 
        'reactive_map_info', 
        'reactive_map_marker', 
        'reactive_category', 
        'reactive_grid', 
        'autosearch_template'
      ), 
      'posts_per_page' => '-1'
    )
  );
  // _log($all_templates);
$custom_script = '';
foreach ($all_templates as $template) {
  if ($template->post_type === 'reactive_grid') {

  $gridName = 'grid_'. str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactiveGridLayouts.push(
    {
      value: "$gridName",
      title: "$template->post_title",
    }
  );
EOD;
}

if ($template->post_type === 'reactive_category') {
  $categoryName = 'category_' . str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactiveCategoryLayouts.push(
    {
      value: "$categoryName",
      title: "$template->post_title",
    }
  );
EOD;
}

if ($template->post_type === 'reactive_map_marker') {
  $markerName = 'map_marker_' . str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactiveMarkerIconsLayouts.push(
    {
      value: "$markerName",
      title: "$template->post_title",
    }
  );
EOD;
}

if ($template->post_type === 'reactive_map_info') {
  $infoName =  'map_info_window_' . str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactiveInfoWindowLayouts.push(
    {
      value: "$infoName",
      title: "$template->post_title",
    }
  );
EOD;
}

if ($template->post_type === 're_preview_popup') {
  $preview_popupName =  'preview_popup_' . str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactivePreviewPopupLayouts.push(
    {
      value: "$preview_popupName",
      title: "$template->post_title",
    }
  );
EOD;
}
if ($template->post_type === 'autosearch_template') {
  $autosearch_template_name =  'autosearch_' . str_replace("-", "", $template->post_name);
$custom_script .= <<<EOD
    ReactiveAutoSearchTermplate.push(
    {
      value: "$autosearch_template_name",
      title: "$template->post_title",
    }
  );
EOD;
}
}

    wp_add_inline_script('reuse-form-variable-reactive', $custom_script);      
    $this->re_load_reuse_form_scripts();
    $this->load_reactive_scripts();
  }

  public function re_load_reuse_form_scripts(){
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    if ( !is_plugin_active( 'redq-reuse-form/redq-reuse-form.php' ) ) {
      wp_register_style('reuse-form-two', RE_REUSE_FORM_CSS.'reuse-form-two.css', array(), $ver = false, $media = 'all');
      wp_register_style('reuse-form', RE_REUSE_FORM_CSS.'reuse-form.css', array(), $ver = false, $media = 'all');
      $reuse_form_scripts = new Reuse;
      $webpack_public_path = get_option('webpack_public_path_url', true);
      if (file_exists($webpack_public_path)) {
        $reuse_form_scripts->load($webpack_public_path);
      }
    }
  }

  public function load_reactive_scripts() {
    // All other assets
    $is_admin = 'false';
    if (current_user_can('editor') || current_user_can('administrator') ) {
      $is_admin = 'true';
    }
    $editMode = $is_admin === 'true' ? 'admin' : 'user';
    if (isset($_POST['editMode'])) {
      $editMode = $_POST['editMode'];
    }

    $reactive_frontend_scripts = json_decode(file_get_contents( RE_FILE . "/resource/frontend-assets.json"),true);
    if (isset($reactive_frontend_scripts['vendor'])) {
      wp_register_script( 're_vendor', RE_JS. $reactive_frontend_scripts['vendor']['js'] , array(), $ver = false, true);
    }
    $base_loaded = false;
    $is_admin = 'false';
    if (current_user_can('editor') || current_user_can('administrator') ) {
      $is_admin = 'true';
    }
    $wpml_lang = '';
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
      //plugin is activated
      $wpml_lang = ICL_LANGUAGE_CODE;
    }
    foreach ($reactive_frontend_scripts as $filename => $file) {
      if (in_array($filename, $this->custom_scripts)) {
        if ($filename === 're_base' && $editMode === 'admin') {
          $base_loaded = true;
          wp_register_script( $filename, RE_JS. $file['js'] , array('jquery', 'underscore'), $ver = false, true);
        }
      }
    }
    foreach ($reactive_frontend_scripts as $filename => $file) {
      if (in_array($filename, $this->custom_scripts)) {
        if ($base_loaded === false && $editMode === 'user' && $filename === 're_preview') {
          wp_register_script( $filename, RE_JS. $file['js'] , array('jquery', 'underscore'), $ver = false, true);
        }
      }
    }
  }

  public function add_custom_attribute($tag, $handle) {
    foreach($this->custom_scripts as $script) {
       if ($script === $handle) {
          return str_replace(' src', ' defer="defer" src', $tag);
       }
    }
    return $tag;
  }

}
