<?php

// 2019 Child Theme Functions File

add_action('wp_enqueue_scripts', 'ssws_enqueue_wp_child_theme');
function ssws_enqueue_wp_child_theme()
{
    if ((esc_attr(get_option('ssws_setting_x')) != "Yes")) {
        //This is your parent stylesheet you can choose to include or exclude this by going to your Child Theme Settings under the "Settings" in your WP Dashboard
        wp_enqueue_style('parent-css', get_template_directory_uri() . '/style.css');
    }

    //This is your child theme stylesheet = style.css
    wp_enqueue_style('child-css', get_stylesheet_uri());

    //This is your child theme js file = js/script.js
    // wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/js/script.js', array('jquery'), '1.0', true);
}

add_action('init', 'ssws_change_post_object');
// Change dashboard Posts to Businesses
function ssws_change_post_object()
{
    $get_post_type = get_post_type_object('post');
    $labels = $get_post_type->labels;
    $labels->name = 'Businesses';
    $labels->singular_name = 'Business';
    $labels->add_new = 'Add Business';
    $labels->add_new_item = 'Add Business';
    $labels->edit_item = 'Edit Business';
    $labels->new_item = 'Business';
    $labels->view_item = 'View Business';
    $labels->search_items = 'Search Businesses';
    $labels->not_found = 'No Businesses found';
    $labels->not_found_in_trash = 'No Businesses found in Trash';
    $labels->all_items = 'All Businesses';
    $labels->menu_name = 'Businesses';
    $labels->name_admin_bar = 'Business';
}

// Change dashboard admin icons
function replace_admin_menu_icons_css()
{
    ?>
    <style>
        .dashicons-admin-post::before {
            content: "";
            background-image: url('/wp-content/themes/minimal-lite-child/assets/images/menu-icon@2x.png');
            background-size: contain;
            background-repeat: no-repeat;
        }
        }
    </style>
    <?php
}
add_action('admin_head', 'replace_admin_menu_icons_css');

/********************************************************/
// inject_formatted_phone
/********************************************************/
if (!function_exists('ssws_inject_formatted_phone')) {
    add_action('wp_footer', 'ssws_inject_formatted_phone');
    function ssws_inject_formatted_phone()
    {
        ?>
            <script>
                jQuery(document).ready(function($) {
                    // Custom jQuery goes here
                    console.info('SSWS start ssws_inject_formatted_phone');
                    $('.formatted_phone').text(function(i, text) {
                        // console.log(text);
                        console.log('formatted_phone done via function.php');
                        return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                    });
                });
            </script>
        <?php
}
}