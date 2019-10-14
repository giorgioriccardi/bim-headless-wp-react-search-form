<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Minimal_Lite
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function minimal_lite_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

    $site_layout = minimal_lite_get_option('site_layout',true);

	if( 'fullwidth' == $site_layout){
        $classes[] = 'thememattic-full-layout';
    }
    if( 'boxed' == $site_layout ){
        $classes[] = 'thememattic-boxed-layout';
    }
    $page_layout = minimal_lite_get_page_layout();
    $classes[] = esc_attr($page_layout);

	return $classes;
}
add_filter( 'body_class', 'minimal_lite_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function minimal_lite_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'minimal_lite_pingback_header' );