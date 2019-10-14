<?php

/*Get default values to set while building customizer elements*/
$default_options = minimal_lite_get_default_customizer_values();

/*Get image sizes*/
$image_sizes = minimal_lite_get_all_image_sizes(true);

/* ========== Site title text size option added to default Site Identity section ========== */

$wp_customize->add_setting(
    'theme_options[enable_header_overlay]',
    array(
        'default'           => $default_options['enable_header_overlay'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_header_overlay]',
    array(
        'label'    => __( 'Enable Header Overlay', 'minimal-lite' ),
        'section'  => 'header_image',
        'type'     => 'checkbox',
    )
);
/*Site title text size*/
$wp_customize->add_setting(
    'theme_options[site_title_text_size]',
    array(
        'default' => $default_options['site_title_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[site_title_text_size]',
    array(
        'label' => __('Site Title Text Size', 'minimal-lite'),
        'section' => 'title_tagline',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);
/**/

/* ========== Color Options added to default color section ========== */

/*Primary Color*/
$wp_customize->add_setting(
    'theme_options[primary_color]',
    array(
        'default' => $default_options['primary_color'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[primary_color]',
    array(
        'label' => __('Primary Color', 'minimal-lite'),
        'section' => 'colors',
        'type' => 'color',
    )
);

/*Secondary Color*/
$wp_customize->add_setting(
    'theme_options[secondary_color]',
    array(
        'default' => $default_options['secondary_color'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[secondary_color]',
    array(
        'label' => __('Secondary Color', 'minimal-lite'),
        'section' => 'colors',
        'type' => 'color',
    )
);

/* ========== Color Options Close ========== */

/*Add Home Page Options Panel.*/
$wp_customize->add_panel(
    'theme_home_option_panel',
    array(
        'title' => __( 'Homepage Sections', 'minimal-lite' ),
        'description' => __( 'Contains all front page settings', 'minimal-lite')
    )
);
/**/

/* ========== Home Page Slider Section ========== */
$wp_customize->add_section(
    'home_banner_options' ,
    array(
        'title' => __( 'Slider Options', 'minimal-lite' ),
        'panel' => 'theme_home_option_panel',
    )
);

/*Enable Slider Section*/
$wp_customize->add_setting(
    'theme_options[enable_slider_posts]',
    array(
        'default'           => $default_options['enable_slider_posts'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_slider_posts]',
    array(
        'label'    => __( 'Enable Banner Slider', 'minimal-lite' ),
        'section'  => 'home_banner_options',
        'type'     => 'checkbox',
    )
);
/**/

$wp_customize->add_setting(
    'theme_options[slider_style_option]',
    array(
        'default'           => $default_options['slider_style_option'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[slider_style_option]',
    array(
        'label'       => __( 'Select Banner Slider Style', 'minimal-lite' ),
        'section'     => 'home_banner_options',
        'type'        => 'select',
        'choices'     => array(
            'main-slider-default' => __( 'Default Slider', 'minimal-lite' ),
            'main-slider-default-1' => __( 'Slider Style 2', 'minimal-lite' )
        ),
    )
);
/*Slider Category.*/
$wp_customize->add_setting(
    'theme_options[slider_cat]',
    array(
        'default'           => $default_options['slider_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[slider_cat]',
        array(
            'label'    => __( 'Choose Slider category', 'minimal-lite' ),
            'section'  => 'home_banner_options',
            'active_callback'  => 'minimal_lite_is_banner_slider_enabled',
        )
    )
);

/*Number of Slider Posts.*/
$wp_customize->add_setting(
    'theme_options[no_of_slider_posts]',
    array(
        'default'           => $default_options['no_of_slider_posts'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    'theme_options[no_of_slider_posts]',
    array(
        'label'    => __( 'No of Slider Posts', 'minimal-lite' ),
        'section'  => 'home_banner_options',
        'type'     => 'number',
        'input_attrs' => array('min' => 1, 'max' => 4, 'style' => 'width: 150px;'),
        'active_callback'  => 'minimal_lite_is_banner_slider_enabled',
    )
);
/**/

/*Enable Slider Meta Info*/
$wp_customize->add_setting(
    'theme_options[enable_slider_meta_info]',
    array(
        'default'           => $default_options['enable_slider_meta_info'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_slider_meta_info]',
    array(
        'label'    => __( 'Enable Category Info', 'minimal-lite' ),
        'section'  => 'home_banner_options',
        'type'     => 'checkbox',
        'active_callback'  => 'minimal_lite_is_banner_slider_enabled',
    )
);
/**/

/*Enable Slider overlay*/
$wp_customize->add_setting(
    'theme_options[enable_slider_overlay]',
    array(
        'default'           => $default_options['enable_slider_overlay'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_slider_overlay]',
    array(
        'label'    => __( 'Enable Slider Overlay', 'minimal-lite' ),
        'section'  => 'home_banner_options',
        'type'     => 'checkbox',
        'active_callback'  => 'minimal_lite_is_banner_slider_enabled',
    )
);
/**/

/*Enable Slider Loop*/
$wp_customize->add_setting(
    'theme_options[enable_slider_loop]',
    array(
        'default'           => $default_options['enable_slider_loop'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_slider_loop]',
    array(
        'label'    => __( 'Loop slider after last slide', 'minimal-lite' ),
        'section'  => 'home_banner_options',
        'type'     => 'checkbox',
        'active_callback'  => 'minimal_lite_is_banner_slider_enabled',
    )
);
/**/

/* ========== Home Page Slider Section Close ========== */

/* ========== Home Page Featured Categories Section ========== */
$wp_customize->add_section(
    'home_featured_categories_options' ,
    array(
        'title' => __( 'Featured Categories Options', 'minimal-lite' ),
        'panel' => 'theme_home_option_panel',
    )
);

/*Enable Featured Categories Section*/
$wp_customize->add_setting(
    'theme_options[enable_ft_categories]',
    array(
        'default'           => $default_options['enable_ft_categories'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_ft_categories]',
    array(
        'label'    => __( 'Enable Featured Categories', 'minimal-lite' ),
        'section'  => 'home_featured_categories_options',
        'type'     => 'checkbox',
    )
);

/*1st Featured Category*/
$wp_customize->add_setting(
    'theme_options[first_ft_cat]',
    array(
        'default'           => $default_options['first_ft_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[first_ft_cat]',
        array(
            'label'    => __( 'Choose First Category', 'minimal-lite' ),
            'section'  => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*1st Featured Category Image*/
$wp_customize->add_setting(
    'theme_options[first_ft_cat_image]',
    array(
        'default'           => $default_options['first_ft_cat_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_image',
    )
);
$wp_customize->add_control(
    new WP_Customize_Image_Control(
        $wp_customize,
        'theme_options[first_ft_cat_image]',
        array(
            'label'           => __( 'First Category Image', 'minimal-lite' ),
            'description'	  => sprintf( esc_html__( 'Recommended Size %1$s px X %2$s px', 'minimal-lite' ), 750, 90 ),
            'section'         => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*2nd Featured Category*/
$wp_customize->add_setting(
    'theme_options[second_ft_cat]',
    array(
        'default'           => $default_options['second_ft_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[second_ft_cat]',
        array(
            'label'    => __( 'Choose Second Category', 'minimal-lite' ),
            'section'  => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*2nd Featured Category Image*/
$wp_customize->add_setting(
    'theme_options[second_ft_cat_image]',
    array(
        'default'           => $default_options['second_ft_cat_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_image',
    )
);
$wp_customize->add_control(
    new WP_Customize_Image_Control(
        $wp_customize,
        'theme_options[second_ft_cat_image]',
        array(
            'label'           => __( 'Second Category Image', 'minimal-lite' ),
            'description'	  => sprintf( esc_html__( 'Recommended Size %1$s px X %2$s px', 'minimal-lite' ), 750, 90 ),
            'section'         => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*3rd Featured Category*/
$wp_customize->add_setting(
    'theme_options[third_ft_cat]',
    array(
        'default'           => $default_options['third_ft_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[third_ft_cat]',
        array(
            'label'    => __( 'Choose Third Category', 'minimal-lite' ),
            'section'  => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*3rd Featured Category Image*/
$wp_customize->add_setting(
    'theme_options[third_ft_cat_image]',
    array(
        'default'           => $default_options['third_ft_cat_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_image',
    )
);
$wp_customize->add_control(
    new WP_Customize_Image_Control(
        $wp_customize,
        'theme_options[third_ft_cat_image]',
        array(
            'label'           => __( 'Third Category Image', 'minimal-lite' ),
            'description'	  => sprintf( esc_html__( 'Recommended Size %1$s px X %2$s px', 'minimal-lite' ), 750, 90 ),
            'section'         => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*4th Featured Category*/
$wp_customize->add_setting(
    'theme_options[fourth_ft_cat]',
    array(
        'default'           => $default_options['fourth_ft_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[fourth_ft_cat]',
        array(
            'label'    => __( 'Choose Fourth Category', 'minimal-lite' ),
            'section'  => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/*4th Featured Category Image*/
$wp_customize->add_setting(
    'theme_options[fourth_ft_cat_image]',
    array(
        'default'           => $default_options['fourth_ft_cat_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_image',
    )
);
$wp_customize->add_control(
    new WP_Customize_Image_Control(
        $wp_customize,
        'theme_options[fourth_ft_cat_image]',
        array(
            'label'           => __( 'Fourth Category Image', 'minimal-lite' ),
            'description'	  => sprintf( esc_html__( 'Recommended Size %1$s px X %2$s px', 'minimal-lite' ), 750, 90 ),
            'section'         => 'home_featured_categories_options',
            'active_callback'  => 'minimal_lite_is_ft_cats_enabled',
        )
    )
);

/* ========== Home Page Featured Categories Section Close ========== */

/* ========== Home Page Full Width Grid Section ========== */
$wp_customize->add_section(
    'home_footer_recommend_cat_options' ,
    array(
        'title' => __( 'Footer Recommendation Options', 'minimal-lite' ),
        'panel' => 'theme_home_option_panel',
    )
);

/*Enable Full Width Grid Category Section*/
$wp_customize->add_setting(
    'theme_options[enable_footer_recommend_cat]',
    array(
        'default'           => $default_options['enable_footer_recommend_cat'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_footer_recommend_cat]',
    array(
        'label'    => __( 'Enable Recommended Post', 'minimal-lite' ),
        'section'  => 'home_footer_recommend_cat_options',
        'type'     => 'checkbox',
    )
);
$wp_customize->add_setting(
    'theme_options[footer_recommend_cat_title]',
    array(
        'default'           => $default_options['footer_recommend_cat_title'],
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    )
);
$wp_customize->add_control(
    'theme_options[footer_recommend_cat_title]',
    array(
        'label'       => __( 'Related Posts title', 'minimal-lite' ),
        'section'     => 'home_footer_recommend_cat_options',
        'type'        => 'text',
        'active_callback'  => 'minimal_lite_is_full_grid_enabled',
    )
);

/*Full Width Grid Category.*/
$wp_customize->add_setting(
    'theme_options[full_width_grid_cat]',
    array(
        'default'           => $default_options['full_width_grid_cat'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    new Minimal_Lite_Dropdown_Taxonomies_Control(
        $wp_customize,
        'theme_options[full_width_grid_cat]',
        array(
            'label'    => __( 'Choose Recommended Post', 'minimal-lite' ),
            'section'  => 'home_footer_recommend_cat_options',
            'active_callback'  => 'minimal_lite_is_full_grid_enabled',
        )
    )
);

/*Number of Category Posts.*/
$wp_customize->add_setting(
    'theme_options[no_of_full_width_cat_posts]',
    array(
        'default'           => $default_options['no_of_full_width_cat_posts'],
        'sanitize_callback' => 'absint'
    )
);
$wp_customize->add_control(
    'theme_options[no_of_full_width_cat_posts]',
    array(
        'label'    => __( 'No of Posts', 'minimal-lite' ),
        'section'  => 'home_footer_recommend_cat_options',
        'type'     => 'number',
        'active_callback'  => 'minimal_lite_is_full_grid_enabled',
    )
);
/**/

/*Enable Full Width Grid Meta Info*/
$wp_customize->add_setting(
    'theme_options[enable_full_grid_meta_info]',
    array(
        'default'           => $default_options['enable_full_grid_meta_info'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_full_grid_meta_info]',
    array(
        'label'    => __( 'Enable Meta Info', 'minimal-lite' ),
        'section'  => 'home_footer_recommend_cat_options',
        'type'     => 'checkbox',
        'active_callback'  => 'minimal_lite_is_full_grid_enabled',
    )
);
/**/

/*Full Width Cat Section Background Color */
$wp_customize->add_setting(
    'theme_options[full_width_grid_cat_bg_color]',
    array(
        'default'           => $default_options['full_width_grid_cat_bg_color'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[full_width_grid_cat_bg_color]',
    array(
        'label'    => __( 'Background Color', 'minimal-lite' ),
        'section'  => 'home_footer_recommend_cat_options',
        'type'     => 'color',
        'active_callback'  => 'minimal_lite_is_full_grid_enabled',
    )
);
/**/

/*Full Width Cat Section Text Color */
$wp_customize->add_setting(
    'theme_options[full_width_grid_cat_text_color]',
    array(
        'default'           => $default_options['full_width_grid_cat_text_color'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[full_width_grid_cat_text_color]',
    array(
        'label'    => __( 'Text Color', 'minimal-lite' ),
        'section'  => 'home_footer_recommend_cat_options',
        'type'     => 'color',
        'active_callback'  => 'minimal_lite_is_full_grid_enabled',
    )
);
/**/

/* ========== Home Page Full Width Grid Close ========== */

/* ========== Home Page Layout Section ========== */
$wp_customize->add_section(
    'home_page_layout_options',
    array(
        'title'      => __( 'Front Page Layout Options', 'minimal-lite' ),
        'panel'      => 'theme_home_option_panel',
    )
);

/* Home Page Layout */
$wp_customize->add_setting(
    'theme_options[home_page_layout]',
    array(
        'default'           => $default_options['home_page_layout'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[home_page_layout]',
    array(
        'label'       => __( 'Front Page Layout', 'minimal-lite' ),
        'section'     => 'home_page_layout_options',
        'type'        => 'select',
        'choices'     => array(
            'right-sidebar' => __( 'Content - Primary Sidebar', 'minimal-lite' ),
            'left-sidebar' => __( 'Primary Sidebar - Content', 'minimal-lite' ),
            'no-sidebar' => __( 'No Sidebar', 'minimal-lite' )
        ),
    )
);

/* ========== Home Page Layout Section Close ========== */

/*Add Theme Options Panel.*/
$wp_customize->add_panel(
    'theme_option_panel',
    array(
        'title' => __( 'Theme Options', 'minimal-lite' ),
        'description' => __( 'Contains all theme settings', 'minimal-lite')
    )
);
/**/

/* ========== Preloader Section  ========== */
$wp_customize->add_section(
    'preloader_options',
    array(
        'title'      => __( 'Preloader Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);
/*Enable Preloader*/
$wp_customize->add_setting(
    'theme_options[enable_preloader]',
    array(
        'default'           => $default_options['enable_preloader'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_preloader]',
    array(
        'label'    => __( 'Enable Preloader', 'minimal-lite' ),
        'section'  => 'preloader_options',
        'type'     => 'checkbox',
    )
);

/* ========== Preloader Section Close ========== */

/* ========== Header Layout Section  ========== */
$wp_customize->add_section(
    'header_layout_options',
    array(
        'title'      => __( 'Header Layout Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);
/*Enable Preloader*/
$wp_customize->add_setting(
    'theme_options[select_header_layout]',
    array(
        'default'           => $default_options['select_header_layout'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[select_header_layout]',
    array(
        'label'    => __( 'Select Header Layout', 'minimal-lite' ),
        'section'  => 'header_layout_options',
        'type'        => 'select',
        'choices'     => array(
            'header-layout-default' => __( 'Default Header Layout', 'minimal-lite' ),
            'header-layout-sec' => __( 'Secondary Header Layout', 'minimal-lite' ),
        ),
    )
);

$wp_customize->add_setting(
    'theme_options[enable_social_menu_in_header]',
    array(
        'default'           => $default_options['enable_social_menu_in_header'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_social_menu_in_header]',
    array(
        'label'    => __( 'Enable Social Menu on Header', 'minimal-lite' ),
        'section'  => 'header_layout_options',
        'type'     => 'checkbox',
    )
);

/* ========== Header Layout Section Close ========== */

/* ========== Header Layout Section  ========== */
$wp_customize->add_section(
    'side_panel_layout',
    array(
        'title'      => __( 'Side Panel Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);
/*Enable side panel*/
$wp_customize->add_setting(
    'theme_options[enable_side_panel]',
    array(
        'default'           => $default_options['enable_side_panel'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_side_panel]',
    array(
        'label'    => __( 'Enable Side Panel', 'minimal-lite' ),
        'section'  => 'side_panel_layout',
        'type'     => 'checkbox',
    )
);

/*Enable social menu on sidepanel*/
$wp_customize->add_setting(
    'theme_options[enable_social_menu_side_panel]',
    array(
        'default'           => $default_options['enable_social_menu_side_panel'],
        'capability'        => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[enable_social_menu_side_panel]',
    array(
        'label'    => __( 'Enable Social Menu On Side Panel', 'minimal-lite' ),
        'section'  => 'side_panel_layout',
        'type'     => 'checkbox',
    )
);
/* ========== Header Layout Section Close ========== */

/* ==========  Typography Section ========== */
/*google fonts*/
global $minimal_lite_google_fonts;
$wp_customize->add_section(
    'typography_options',
    array(
        'title' => esc_html__('Typography', 'minimal-lite'),
        'capability' => 'edit_theme_options',
        'panel' => 'theme_option_panel',
    )
);

/*Primary Font*/
$wp_customize->add_setting(
    'theme_options[primary_font]',
    array(
        'default' => $default_options['primary_font'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[primary_font]',
    array(
        'label' => __('Primary Font', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'select',
        'choices' => $minimal_lite_google_fonts,
    )
);

/*Secondary Font*/
$wp_customize->add_setting(
    'theme_options[secondary_font]',
    array(
        'default' => $default_options['secondary_font'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[secondary_font]',
    array(
        'label' => __('Secondary Font', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'select',
        'choices' => $minimal_lite_google_fonts,
    )
);

/*Paragraph text sie*/
$wp_customize->add_setting(
    'theme_options[p_text_size]',
    array(
        'default' => $default_options['p_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[p_text_size]',
    array(
        'label' => __('Text Size For Paragraph', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/*h1 text sie*/
$wp_customize->add_setting(
    'theme_options[h1_text_size]',
    array(
        'default' => $default_options['h1_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[h1_text_size]',
    array(
        'label' => __('Text Size For H1', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/*h2 text sie*/
$wp_customize->add_setting(
    'theme_options[h2_text_size]',
    array(
        'default' => $default_options['h2_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[h2_text_size]',
    array(
        'label' => __('Text Size For H2', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/*h3 text sie*/
$wp_customize->add_setting(
    'theme_options[h3_text_size]',
    array(
        'default' => $default_options['h3_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[h3_text_size]',
    array(
        'label' => __('Text Size For H3', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/*h4 text sie*/
$wp_customize->add_setting(
    'theme_options[h4_text_size]',
    array(
        'default' => $default_options['h4_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[h4_text_size]',
    array(
        'label' => __('Text Size For H4', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/*h5 text sie*/
$wp_customize->add_setting(
    'theme_options[h5_text_size]',
    array(
        'default' => $default_options['h5_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[h5_text_size]',
    array(
        'label' => __('Text Size For H5', 'minimal-lite'),
        'section' => 'typography_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);

/* ========== Typography Section Close ========== */

/* ========== Layout Section ========== */
$wp_customize->add_section(
    'layout_options',
    array(
        'title'      => __( 'Layout Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/**/

/*Masonry Animation*/
$wp_customize->add_setting(
    'theme_options[masonry_animation]',
    array(
        'default'           => $default_options['masonry_animation'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[masonry_animation]',
    array(
        'label'       => __( 'Masonry Animation', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => array(
            'none' => __( 'None', 'minimal-lite' ),
            'default' => __( 'Default', 'minimal-lite' ),
            'slide-up' => __( 'Slide Up', 'minimal-lite' ),
            'slide-down' => __( 'Slide Down', 'minimal-lite' ),
            'zoom-out' => __( 'Zoom Out', 'minimal-lite' )
        ),
    )
);
/**/

/* Site Layout*/
$wp_customize->add_setting(
    'theme_options[site_layout]',
    array(
        'default'           => $default_options['site_layout'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[site_layout]',
    array(
        'label'       => __( 'Site Layout', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => array(
            'fullwidth' => __( 'Fullwidth', 'minimal-lite' ),
            'boxed' => __( 'Boxed', 'minimal-lite' )
        ),
    )
);

/* Global Layout*/
$wp_customize->add_setting(
    'theme_options[global_layout]',
    array(
        'default'           => $default_options['global_layout'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[global_layout]',
    array(
        'label'       => __( 'Global Layout', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => array(
            'right-sidebar' => __( 'Content - Primary Sidebar', 'minimal-lite' ),
            'left-sidebar' => __( 'Primary Sidebar - Content', 'minimal-lite' ),
            'no-sidebar' => __( 'No Sidebar', 'minimal-lite' )
        ),
    )
);

/* Image in Archive Page */
$wp_customize->add_setting(
    'theme_options[archive_image]',
    array(
        'default'           => $default_options['archive_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[archive_image]',
    array(
        'label'       => __( 'Image in Archive Page', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => $image_sizes,
    )
);

/* Image in Single Post*/
$wp_customize->add_setting(
    'theme_options[single_post_image]',
    array(
        'default'           => $default_options['single_post_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[single_post_image]',
    array(
        'label'       => __( 'Image in Single Posts', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => $image_sizes,
    )
);

/* Image in Single Page*/
$wp_customize->add_setting(
    'theme_options[single_page_image]',
    array(
        'default'           => $default_options['single_page_image'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[single_page_image]',
    array(
        'label'       => __( 'Image in Single Page', 'minimal-lite' ),
        'section'     => 'layout_options',
        'type'        => 'select',
        'choices'     => $image_sizes,
    )
);

/* ========== Layout Section Close ========== */

/* ========== Pagination Section ========== */
$wp_customize->add_section(
    'pagination_options',
    array(
        'title'      => __( 'Pagination Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/*Pagination Type*/
$wp_customize->add_setting( 
    'theme_options[pagination_type]',
    array(
        'default'           => $default_options['pagination_type'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control( 
    'theme_options[pagination_type]',
    array(
        'label'       => __( 'Pagination Type', 'minimal-lite' ),
        'section'     => 'pagination_options',
        'type'        => 'select',
        'choices'     => array(
            'default' => esc_html__( 'Default (Older / Newer Post)', 'minimal-lite' ),
            'numeric' => esc_html__( 'Numeric', 'minimal-lite' ),
            'button_click_load' => esc_html__( 'Button Click Ajax Load', 'minimal-lite' ),
            'infinite_scroll_load' => esc_html__( 'Infinite Scroll Ajax Load', 'minimal-lite' ),
        ),
    )
);
/* ========== Pagination Section Close========== */

/* ========== Breadcrumb Section ========== */
$wp_customize->add_section(
    'breadcrumb_options',
    array(
        'title'      => __( 'Breadcrumb Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/* Breadcrumb Type*/
$wp_customize->add_setting(
    'theme_options[breadcrumb_type]',
    array(
        'default'           => $default_options['breadcrumb_type'],
        'sanitize_callback' => 'minimal_lite_sanitize_select',
    )
);
$wp_customize->add_control(
    'theme_options[breadcrumb_type]',
    array(
        'label'       => __( 'Breadcrumb Type', 'minimal-lite' ),
        'description' => sprintf( esc_html__( 'Advanced: Requires %1$sBreadcrumb NavXT%2$s plugin', 'minimal-lite' ), '<a href="https://wordpress.org/plugins/breadcrumb-navxt/" target="_blank">','</a>' ),
        'section'     => 'breadcrumb_options',
        'type'        => 'select',
        'choices'     => array(
            'disabled' => __( 'Disabled', 'minimal-lite' ),
            'simple' => __( 'Simple', 'minimal-lite' ),
            'advanced' => __( 'Advanced', 'minimal-lite' ),
        ),
    )
);
/* ========== Breadcrumb Section Close ========== */

/* ========== Single Posts Section ========== */
$wp_customize->add_section(
    'single_posts_options',
    array(
        'title'      => __( 'Single Post Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/*Show Related Posts*/
$wp_customize->add_setting(
    'theme_options[show_related_posts]',
    array(
        'default'           => $default_options['show_related_posts'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[show_related_posts]',
    array(
        'label'    => __( 'Show related Posts', 'minimal-lite' ),
        'section'  => 'single_posts_options',
        'type'     => 'checkbox',
    )
);
/**/

/* Related Post Title */
$wp_customize->add_setting(
    'theme_options[related_posts_title]',
    array(
        'default'           => $default_options['related_posts_title'],
        'sanitize_callback' => 'wp_filter_nohtml_kses',
    )
);
$wp_customize->add_control(
    'theme_options[related_posts_title]',
    array(
        'label'       => __( 'Related Posts title', 'minimal-lite' ),
        'section'     => 'single_posts_options',
        'type'        => 'text',
        'active_callback'  => 'minimal_lite_is_related_posts_enabled',
    )
);
/**/
/* ========== Single Posts Section Close ========== */

/* ========== Archive Section ========== */
$wp_customize->add_section(
    'archive_options',
    array(
        'title'      => __( 'Archive Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/*Show Description on archive pages*/
$wp_customize->add_setting(
    'theme_options[show_desc_archive_pages]',
    array(
        'default'           => $default_options['show_desc_archive_pages'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[show_desc_archive_pages]',
    array(
        'label'    => __( 'Show Description on Archive Pages', 'minimal-lite' ),
        'section'  => 'archive_options',
        'type'     => 'checkbox',
    )
);
/**/

/*Show Meta Info on archive pages*/
$wp_customize->add_setting(
    'theme_options[show_meta_archive_pages]',
    array(
        'default'           => $default_options['show_meta_archive_pages'],
        'sanitize_callback' => 'minimal_lite_sanitize_checkbox',
    )
);
$wp_customize->add_control(
    'theme_options[show_meta_archive_pages]',
    array(
        'label'    => __( 'Show Meta Info on Archive Pages', 'minimal-lite' ),
        'section'  => 'archive_options',
        'type'     => 'checkbox',
    )
);
/* ========== Archive Section Close ========== */

/* ========== Excerpt Section ========== */
$wp_customize->add_section(
    'excerpt_options',
    array(
        'title'      => __( 'Excerpt Options', 'minimal-lite' ),
        'panel'      => 'theme_option_panel',
    )
);

/* Excerpt Length */
$wp_customize->add_setting(
    'theme_options[excerpt_length]',
    array(
        'default'           => $default_options['excerpt_length'],
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[excerpt_length]',
    array(
        'label'       => __( 'Excerpt Length', 'minimal-lite' ),
        'section'     => 'excerpt_options',
        'type'        => 'number',
    )
);
/**/

/*Excerpt text sie*/
$wp_customize->add_setting(
    'theme_options[excerpt_text_size]',
    array(
        'default' => $default_options['excerpt_text_size'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'absint',
    )
);
$wp_customize->add_control(
    'theme_options[excerpt_text_size]',
    array(
        'label' => __('Excerpt Font Size', 'minimal-lite'),
        'section' => 'excerpt_options',
        'type' => 'number',
        'input_attrs' => array('min' => 1, 'max' => 100, 'style' => 'width: 150px;'),
    )
);
/**/

/* ========== Excerpt Section Close ========== */

/* ========== Footer Section ========== */
$wp_customize->add_section(
    'footer_options' ,
    array(
        'title' => __( 'Footer Options', 'minimal-lite' ),
        'panel' => 'theme_option_panel',
    )
);
/*Copyright Text.*/
$wp_customize->add_setting(
    'theme_options[copyright_text]',
    array(
        'default'           => $default_options['copyright_text'],
        'sanitize_callback' => 'sanitize_text_field',
        'transport'           => 'postMessage',
    )
);
$wp_customize->add_control(
    'theme_options[copyright_text]',
    array(
        'label'    => __( 'Copyright Text', 'minimal-lite' ),
        'section'  => 'footer_options',
        'type'     => 'textarea',
    )
);

/*Footer Background Color*/
$wp_customize->add_setting(
    'theme_options[footer_bg_color]',
    array(
        'default' => $default_options['footer_bg_color'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[footer_bg_color]',
    array(
        'label' => __('Footer Background Color', 'minimal-lite'),
        'section' => 'footer_options',
        'type' => 'color',
    )
);

/*Footer Text Color*/
$wp_customize->add_setting(
    'theme_options[footer_text_color]',
    array(
        'default' => $default_options['footer_text_color'],
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'sanitize_hex_color',
    )
);
$wp_customize->add_control(
    'theme_options[footer_text_color]',
    array(
        'label' => esc_html__('Footer Text Color', 'minimal-lite'),
        'section' => 'footer_options',
        'type' => 'color',
    )
);
/* ========== Footer Section Close========== */


