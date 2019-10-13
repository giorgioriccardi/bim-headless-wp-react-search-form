<?php
/**
 *
 */

namespace Reactive\Admin;

class Re_Admin_Rebuilder {

  public function __construct() {
    add_action('init', array($this, 'register_post_type'));
  }

  public function register_post_type() {

    $dynamic_post_types = array();

    new RedQ_Generate_Post_Type( array_merge( array(
      array(
        "name" => "reactive_builder",
        "showName" => __("Reactive Builder", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
        'menuIcon' => 'dashicons-screenoptions',
        'menuPosition' => 87,
      ),
      array(
        "name" => "reactive_grid",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Grid Template", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
      ),
      array(
        "name" => "reactive_layouts",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Search Layouts", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
        'menuIcon' => 'dashicons-schedule',
        'menuPosition' => 89,
      ),
      array(
        "name" => "reactive_category",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Category Template", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
      ),
      array(
        "name" => "reactive_map_marker",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Map Marker Template", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
      ),
      array(
        "name" => "reactive_map_info",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Map Info Window Template", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
      ),
      array(

        "name" => "re_preview_popup",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Preview Popup Template", "reactive"),
        'supports' => array(
          'title' => true,
          'editor' => false,
        ),
      ),
      array(
        "name" => "re_grid_shortcode",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Grid Shortcode", "reactive"),
        'supports' => array(
          'title' => true,
        ),
      ),
      array(
        "name" => "autosearch_template",
        'showInMenu' => 'reactive_templates',
        "showName" => __("Auto Search Template", "reactive"),
        'supports' => array(
          'title' => true,
        ),
      ),
    ), $dynamic_post_types ) );
  }
}
