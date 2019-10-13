<?php
/**
 * Save MetaBox
 */

namespace Reactive\Admin;

class SaveMeta {

  public function __construct() {
    add_action( 'save_post', array( $this, 'save_metabox' ), 9 );
  }

  public function save_metabox( $post_id ){
    // get dynamic metaboxes from the builder
    $dynamic_args = array();
    $geobox_post_meta_fields = [];
    $geobox_post_types = get_option('_reactive_geobox_settings', true);
    $geobox_post_types = json_decode(stripslashes_deep($geobox_post_types));
    $geobox_post_types_array = $geobox_post_types !='1' && $geobox_post_types->geobox_post_type_select !='' ? explode(',', $geobox_post_types->geobox_post_type_select) : [];
    foreach ($geobox_post_types_array as $key => $post_type) {
      $geobox_post_meta_fields[] = array(
        'post_id' => $post_id,
        'post_type' => $post_type,
        'has_individual' => true,
        'meta_fields' => array(
          '_reactive_geobox_preview',
        ),
      );
    }
    $args = array(
      array(
        'post_id' => $post_id,
        'post_type' => 'reactive_builder',
        'has_individual' => true,
        'meta_fields' => array(
          '_reactive_rebuilder_settings',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 'reactive_grid',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 'reactive_category',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 'reactive_map_marker',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 'autosearch_template',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 'reactive_map_info',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 're_preview_popup',
        'has_individual' => false,
        'meta_fields' => array(
          'reactive_grid_template',
        ),
      ),
      array(
        'post_id' => $post_id,
        'post_type' => 're_grid_shortcode',
        'has_individual' => false,
        'meta_fields' => array(
          '_reactive_grid_builder_settings',
        ),
      ),
    );

    $args = array_merge($args, $geobox_post_meta_fields);

    new Redq_Generate_Metabox_Saver( array_merge( $args, $dynamic_args ) );
  }
}
