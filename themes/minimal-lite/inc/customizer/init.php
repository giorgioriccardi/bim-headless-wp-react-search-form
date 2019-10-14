<?php
/**
 * Minimal Lite Theme Customizer
 *
 * @package Minimal_Lite
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function minimal_lite_customize_register( $wp_customize ) {

    /*Load custom controls for customizer.*/
    require get_template_directory() . '/inc/customizer/controls.php';

    /*Load sanitization functions.*/
    require get_template_directory() . '/inc/customizer/sanitize.php';

    /*Load customize callback.*/
    require get_template_directory() . '/inc/customizer/callback.php';

	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'minimal_lite_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'minimal_lite_customize_partial_blogdescription',
		) );
	}

    /*Load customizer options.*/
    require get_template_directory() . '/inc/customizer/options.php';
    // Register custom section types.
    $wp_customize->register_section_type( 'Minimal_Lite_Customize_Section_Upsell' );

    // Register sections.
    $wp_customize->add_section(
    	new Minimal_Lite_Customize_Section_Upsell(
    		$wp_customize,
    		'theme_upsell',
    		array(
    			'title'    => esc_html__( 'Minimal Lite Pro', 'minimal-lite' ),
    			'pro_text' => esc_html__( 'Upgrade To Pro', 'minimal-lite' ),
    			'pro_url'  => 'http://www.thememattic.com/theme/minimal-lite-pro/',
    			'priority'  => 1,
    		)
    	)
    );
}
add_action( 'customize_register', 'minimal_lite_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function minimal_lite_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function minimal_lite_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function minimal_lite_customize_preview_js() {
	wp_enqueue_script(
	    'minimal-lite-themecustomizer',
        get_template_directory_uri() . '/assets/thememattic/js/customizer.js',
        array( 'jquery','customize-preview' ),
        '',
        true
    );
}
add_action( 'customize_preview_init', 'minimal_lite_customize_preview_js' );

/**
 * Customizer control scripts and styles.
 *
 * @since 1.0.0
 */
function minimal_lite_customizer_control_scripts(){
    wp_enqueue_style('minimal-lite-customizer-css', get_template_directory_uri() . '/assets/thememattic/css/admin.css');
    wp_enqueue_script( 'minimal-lite-customize-controls', get_template_directory_uri() . '/assets/thememattic/js/customizer-admin.js', array( 'customize-controls' ) );
    
}
add_action('customize_controls_enqueue_scripts', 'minimal_lite_customizer_control_scripts', 0);