<?php
/**
 * Recommended plugins
 *
 * @package minimal-lite
 */
if ( ! function_exists( 'minimal_lite_recommended_plugins' ) ) :
	/**
	 * Recommend plugins.
	 *
	 * @since 1.0.0
	 */
	function minimal_lite_recommended_plugins() {
		$plugins = array(
			array(
				'name'     => esc_html__( 'One Click Demo Import', 'minimal-lite' ),
				'slug'     => 'one-click-demo-import',
				'required' => false,
			),
		);
		tgmpa( $plugins );
	}
endif;
add_action( 'tgmpa_register', 'minimal_lite_recommended_plugins' );
