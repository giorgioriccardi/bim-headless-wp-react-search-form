<?php

namespace Reactive\Admin;

use Reactive\Admin\RedQ_Generate_MetaBox;

class Re_Generator_Metabox {
  public function __construct(){
    add_action( 'add_meta_boxes', array( $this , 'create_meta_section') );
  }

  public function create_meta_section(){
    $args = [];
    $post_types = get_option('_reactive_geobox_settings', true);
    $post_types = json_decode(stripslashes_deep($post_types));
    $post_types_array = $post_types != '1' && $post_types->geobox_post_type_select !='' ? explode(',', $post_types->geobox_post_type_select) : [];
    if(!empty($post_types_array)){
      foreach( $post_types_array as $post_type ) {
        $args[] = array(
          'id' => 'geo_metabox_preview',
          'name' => __('Location', 'reactive'),
          'post_type' => $post_type,
          'position' => 'high',
          'template_path' => '/geo-metabox-preview.php'
        );
      }
    }

    $args[] = array(
       'id' => '_reactive_rebuilder_post_settings',
       'name' => __('Rebuilder Settings', 'reactive'),
       'post_type' => 'reactive_builder',
       'position' => 'high',
       'template_path' => '/rebuilder-settings.php',
     );
    $args[] = array(
       'id' => '_reactive_grid_template_metabox',
       'name' => __('Grid Template Code', 'reactive'),
       'post_type' => 'reactive_grid',
       'position' => 'high',
       'template_path' => '/grid-template.php',
     );
    $args[] = array(
       'id' => '_reactive_category_template_metabox',
       'name' => __('Category Template Code', 'reactive'),
       'post_type' => 'reactive_category',
       'position' => 'high',
       'template_path' => '/category-template.php',
     );
    $args[] = array(
       'id' => '_reactive_map_marker_template_metabox',
       'name' => __('Map Marker Template Code', 'reactive'),
       'post_type' => 'reactive_map_marker',
       'position' => 'high',
       'template_path' => '/map-marker-template.php',
     );
    $args[] = array(
       'id' => '_reactive_map_info_template_metabox',
       'name' => __('Map Info Template Code', 'reactive'),
       'post_type' => 'reactive_map_info',
       'position' => 'high',
       'template_path' => '/map-info-template.php',
     );
    $args[] = array(
       'id' => '_reactive_preview_popup_template_metabox',
       'name' => __('Preview Popup Template Code', 'reactive'),
       'post_type' => 're_preview_popup',
       'position' => 'high',
       'template_path' => '/preview-popup-template.php',
     );
      $args[] = array(
       'id' => '_reactive_grid_builder',
       'name' => __('Grid Builder', 'reactive'),
       'post_type' => 're_grid_shortcode',
       'position' => 'high',
       'template_path' => '/grid-shortcode-template.php',
     );
      $args[] = array(
       'id' => '_reactive_autosearch_template',
       'name' => __('Auto Search Template', 'reactive'),
       'post_type' => 'autosearch_template',
       'position' => 'high',
       'template_path' => '/autosearch-template.php',
     );
    add_meta_box(
      'reactive_rebuilder_shortcode',
      __( 'Shortcode', 'reactive' ),
      array( $this, 'render_shortcode_meta_box_content' ),
      'reactive_builder',
      'side',
      'high'
    );
    add_meta_box(
      'reactive_grid_builder_shortcode',
      __( 'Shortcode', 'reactive' ),
      array( $this, 'render_grid_shortcode_meta_box_content' ),
      're_grid_shortcode',
      'side',
      'high'
    );

    new RedQ_Generate_MetaBox($args);
  }

  /**
   * Render Meta Box content.
   *
   * @param WP_Post $post The post object.
   */
  public function render_shortcode_meta_box_content( $post ) {
    ?>
    <h4><?php echo esc_attr( 'Please copy this shortcode', 'reactive' ) ?></h4>
    <div class="scwp-snippet">
    <div class="scwp-clippy-icon" data-clipboard-snippet=""><img class="clippy" width="13" src="<?php print RE_IMG ?>clippy.svg" alt="Copy to clipboard"></div><code class="js hljs javascript">[reactive key="<?php echo $post->ID ?>"]</code>
    </div>
    <?php
  }
  public function render_grid_shortcode_meta_box_content( $post ) {
    ?>
    <h4><?php echo esc_attr( 'Please copy this shortcode', 'reactive' ) ?></h4>
    <div class="scwp-snippet">
    <div class="scwp-clippy-icon" data-clipboard-snippet=""><img class="clippy" width="13" src="<?php print RE_IMG ?>clippy.svg" alt="Copy to clipboard"></div><code class="js hljs javascript">[reactive_grid key="<?php echo $post->ID ?>"]</code>
    </div>
    <?php
  }

} // end of class
