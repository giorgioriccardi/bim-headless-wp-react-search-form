<?php 

if ( ! function_exists( 'minimal_lite_breadcrumb_content' ) ) :

	/**
	 * Display breadcrumb.
	 *
	 * @since 1.0.0
	 */
	function minimal_lite_breadcrumb_content() {

		// Bail if Breadcrumb disabled.
		$breadcrumb_type = minimal_lite_get_option( 'breadcrumb_type', true );
		if ( 'disabled' === $breadcrumb_type ) {
			return;
		}
		// Bail if Home Page.
		if ( is_front_page() || is_home() ) {
			return;
		}
		// Render breadcrumb.
		switch ( $breadcrumb_type ) {
			case 'simple':
				minimal_lite_get_breadcrumb();
			break;
			case 'advanced':
				if ( function_exists( 'bcn_display' ) ) {
					bcn_display();
				}
			break;
			default:
			break;
		}
		return;
	}

endif;

add_action( 'minimal_lite_display_breadcrumb', 'minimal_lite_breadcrumb_content' );
