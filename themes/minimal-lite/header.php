<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Minimal_Lite
 */
?>
    <!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <?php wp_head(); ?>
    </head>
<body <?php body_class(); ?>>

    <?php
    $enable_preloader = minimal_lite_get_option('enable_preloader', true);
    $style = 'style="display:none"';
    if ($enable_preloader) {
        $style = '';
    }
    ?>
    <div class="preloader" <?php echo $style; ?>>
        <div class="loader-wrapper">
            <div id="loading-center">
                <div id="loading-center-absolute">
                    <div class="object" id="first_object"></div>
                    <div class="object" id="second_object"></div>
                    <div class="object" id="third_object"></div>

                </div>
            </div>
        </div>
    </div>
    <?php
    if (is_front_page()) {
        $slider_style = minimal_lite_get_option('slider_style_option', 'main-slider-default');
        if ($slider_style == 'main-slider-default') {
            $slider_style = " ";
        } else {
            $slider_style = "nav-overlay-enabled";
        }
    } else {
        $slider_style = "";
    }
    ?>
    <?php $side_panel_enable = minimal_lite_get_option('enable_side_panel', true);
    if ($side_panel_enable == true) {
        $side_panel_enable = "side-panel-enabled ";
    } else {
        $side_panel_enable = "";
    } ?>
    <?php
    $main_slider_style = minimal_lite_get_option('slider_style_option', 'main-slider-default');
    $main_header_style = minimal_lite_get_option('select_header_layout', 'header-layout-default');
    if (($main_slider_style == 'main-slider-default-1') && ($main_header_style == 'header-layout-sec')) {
        $minimal_lite_style_cover = 'fullscreen-nav';
    } else {
        $minimal_lite_style_cover = 'halfscreen-nav';
    }
    ?>
    <div id="page" class="site <?php echo esc_attr($minimal_lite_style_cover); ?>  <?php echo esc_attr($side_panel_enable); ?> <?php echo esc_attr($slider_style); ?>">
        <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e('Skip to content', 'minimal-lite'); ?></a>
        <?php $side_panel_enable = minimal_lite_get_option('enable_side_panel', true);
            if ($side_panel_enable == true) { ?>
        <div class="side-panel">
            <?php if (is_active_sidebar('offcanvas-sidebar')) : ?>
                <div id="push-trigger" class="trigger-nav side-panel-item">
                    <div class="trigger-nav-label"><?php esc_html_e('Menu', 'minimal-lite'); ?></div>
                    <div class="trigger-icon">
                        <span class="icon-bar top"></span>
                        <span class="icon-bar middle"></span>
                        <span class="icon-bar bottom"></span>
                    </div>
                </div>
            <?php endif; ?>


            <div class="theme-mode side-panel-item">
            </div>

            <?php $side_social_menu_panel_enable = minimal_lite_get_option('enable_social_menu_side_panel', true);
            if ($side_social_menu_panel_enable == true) { ?>
                <?php 
                if (has_nav_menu('social-nav')) { ?>
                    <div class="aside-social side-panel-item">
                        <div class="social-icons">
                            <?php
                            wp_nav_menu(
                                array('theme_location' => 'social-nav',
                                    'link_before' => '<span>',
                                    'link_after' => '</span>',
                                    'menu_id' => 'social-menu',
                                    'fallback_cb' => false,
                                    'menu_class' => false
                                )); ?>
                        </div>
                        <div class="social-label hidden-sm hidden-xs"><?php esc_html_e('Follow', 'minimal-lite'); ?></div>
                    </div>
                <?php } ?>
            <?php } ?>
        </div>
        <?php } ?>

        <div class="main-panel">
        <?php
        $header_layout = minimal_lite_get_option('select_header_layout',true);
        if ($header_layout == 'header-layout-default') {
            get_template_part( 'components/header/header', 'main' );
        } elseif ($header_layout == 'header-layout-sec') {
            get_template_part( 'components/header/header', 'secondary' );
        } ?>
        <div class="popup-search">
            <div class="table-align">
                <div class="table-align-cell">
                    <?php get_search_form(); ?>
                </div>
            </div>
            <div class="close-popup"></div>
        </div>
        <?php
        if (is_front_page() || is_home()) {
            /**
             * Hook - minimal_lite_home_section.
             *
             * @hooked minimal_lite_banner_content - 10
             * @hooked minimal_lite_featured_categories - 20
             * @hooked minimal_lite_home_full_grid_cat - 30
             * @hooked minimal_lite_home_panel_grid_cat - 40
             */
            do_action('minimal_lite_home_section');
        } else {
            /**
             * Hook - minimal_lite_inner_header.
             *
             * @hooked minimal_lite_display_inner_header - 10
             */
            do_action('minimal_lite_inner_header');
            ?>
            <div id="content" class="site-content">
            <?php
        }