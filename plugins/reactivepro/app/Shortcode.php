<?php

namespace Reactive\App;

/**
* Class Re_Shortcodes
*/
class Shortcode extends Template
{
	public function __construct()
	{
    $shortcodes = array(
       'reactive' => 'load_reactive',
       'reactive_grid' => 'load_reactive_grid',
    );
    foreach ( $shortcodes as $shortcode => $function ) {
        add_shortcode( $shortcode , array( $this , $function ) );
    }
	}


	public function load_reactive( $atts )
	{
    extract( shortcode_atts(
      array(
        'key' => '',
      ), $atts )
    );
    ob_start();
    $template = RE_DIR. '/shortcodes/preview.php';
    include_once($template);
    return ob_get_clean();
	}
	public function load_reactive_grid( $atts )
	{
    extract( shortcode_atts(
      array(
        'key' => '',
      ), $atts )
    );

		// $grid_builder_data = json_decode(get_post_meta($key, '_reactive_grid_builder_settings', true));
        //
		// if (isset($grid_builder_data->rebuilder_post_type_select)) {
		//   $post_types = explode(',', $grid_builder_data->rebuilder_post_type_select);
		// }
        //
		// $alldata = array(
		//   $key => $post_types
		// );

		// wp_localize_script( 're_base', 'REACTIVE_GRID', $alldata);

        return '<div id="reactive-grid-root-'.$key.'" data-key="'.$key.'"></div>';
	}

}
