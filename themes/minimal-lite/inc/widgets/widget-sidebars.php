<?php
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function minimal_lite_widgets_init()
{
    register_sidebar(array(
        'name' => esc_html__('Sidebar', 'minimal-lite'),
        'id' => 'sidebar-1',
        'description' => esc_html__('Displays items on sidebar.', 'minimal-lite'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<div class="thememattic-title-wrapper"><h2 class="widget-title thememattic-title">',
        'after_title' => '</h2></div>',
    ));

    register_sidebar(array(
        'name' => esc_html__('Offcanvas Sidebar', 'minimal-lite'),
        'id' => 'offcanvas-sidebar',
        'description' => esc_html__('Displays items on Offcanvas Sidebar.', 'minimal-lite'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<div class="thememattic-title-wrapper"><h2 class="widget-title thememattic-title">',
        'after_title' => '</h2></div>',
    ));

    register_sidebar(array(
        'name' => esc_html__('Footer Column One', 'minimal-lite'),
        'id' => 'footer-col-one',
        'description' => esc_html__('Displays items on footer first column.', 'minimal-lite'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
    register_sidebar(array(
        'name' => esc_html__('Footer Column Two', 'minimal-lite'),
        'id' => 'footer-col-two',
        'description' => esc_html__('Displays items on footer second column.', 'minimal-lite'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
    register_sidebar(array(
        'name' => esc_html__('Footer Column Three', 'minimal-lite'),
        'id' => 'footer-col-three',
        'description' => esc_html__('Displays items on footer third column.', 'minimal-lite'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}

add_action('widgets_init', 'minimal_lite_widgets_init');