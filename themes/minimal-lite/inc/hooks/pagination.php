<?php 

if ( ! function_exists( 'minimal_lite_display_posts_navigation' ) ) :

	/**
	 * Display Pagination.
	 *
	 * @since 1.0.0
	 */
	function minimal_lite_display_posts_navigation() {

        $pagination_type = minimal_lite_get_option( 'pagination_type', true );
        switch ( $pagination_type ) {

            case 'default':
                the_posts_navigation();
                break;

            case 'numeric':
                the_posts_pagination();
                break;

            case 'infinite_scroll_load':
                minimal_lite_ajax_pagination('scroll');
                break;

            case 'button_click_load':
                minimal_lite_ajax_pagination('click');
                break;

            default:
                break;
        }
		return;
	}

endif;

add_action( 'minimal_lite_posts_navigation', 'minimal_lite_display_posts_navigation' );
