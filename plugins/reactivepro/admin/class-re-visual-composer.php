<?php

namespace Reactive\Admin;

/**
* 
*/
class Re_Visual_Composer {
  
  public function __construct() {
    add_filter( 'vc_before_init', array( $this, 'my_module_add_grid_shortcodes' ) );
  }

  public function my_module_add_grid_shortcodes() {
    $rebuilder = array();
    $args = array(
      'posts_per_page'   => -1,
      'post_type'        => 'rebuilder',
    );
    $posts_array = get_posts( $args );
    foreach ($posts_array as $post) {
      $rebuilder[$post->post_title] = $post->ID;
    }
    vc_map( array(
      "name" => __( "Reactive Builder", "reactive" ), //This name will be shown in the visual composer pop up.
      "base" => "reactive", // name of the shortcode. 
      "class" => "",
      "category" => __( "Reactive PRO", "reactive"), // in which tab it will appeared? there are several tabs: content, social etc.
      "params" => array(
        array(
          "type" => "dropdown",
          "holder" => "div",
          "class" => "",
          "heading" => __( "Key", "reactive" ),
          "param_name" => "key",
          "value" => $rebuilder,
          "description" => __( 'Create the builder shortcode from Reactive Builder', "reactive" )
        ),
      )
    ) );
  }
}