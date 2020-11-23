<?php

/********************************************************/
/********************************************************/
// 2019 BIM Business Search Child Theme Functions
/********************************************************/
/********************************************************/

/**
 * Load all required files also in the child theme directory
 * get_theme_file_path()
 * https://make.wordpress.org/core/2016/09/09/new-functions-hooks-and-behaviour-for-theme-developers-in-wordpress-4-7/
 */
require get_theme_file_path() . '/inc/init.php';

/********************************************************/
// Enqueue styles and scripts
/********************************************************/
add_action('wp_enqueue_scripts', 'ssws_enqueue_wp_child_theme');
function ssws_enqueue_wp_child_theme()
{
    if ((esc_attr(get_option('ssws_setting_x')) != "Yes")) {
        // Parent stylesheet
        // var_dump(get_template_directory_uri());
        wp_enqueue_style('parent-css', get_template_directory_uri() . '/style.css');
    }

    // Child theme stylesheet = style.css
    wp_enqueue_style('child-css', get_stylesheet_uri());

    // Child theme js file = js/script.js
    // wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/js/script.js', array('jquery'), '1.0', true);
}

/********************************************************/
// Change dashboard Posts to Businesses
/********************************************************/
add_action('init', 'ssws_change_post_object');
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

/********************************************************/
// Change dashboard admin icons
/********************************************************/
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
        console.log('formatted_phone done via functions.php');
        return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    });
});
</script>
<?php
    }
}

/********************************************************/
// Test post nav in the sidebar
/********************************************************/
function ssws_add_before_siderbar()
{
    if (is_single()) {
        the_post_navigation(array(
            'next_text' => '<span class="meta-nav" aria-hidden="true">' . __('&rarr;', 'minimal-lite') . '</span> ' .
                '<span class="screen-reader-text">' . __('Next post:', 'minimal-lite') . '</span> ' .
                '<span class="post-title">%title</span>',
            'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __('&larr;', 'minimal-lite') . '</span> ' .
                '<span class="screen-reader-text">' . __('Previous post:', 'minimal-lite') . '</span> ' .
                '<span class="post-title">%title</span>',
        ));
    }
}
// add_action( 'get_sidebar', 'ssws_add_before_siderbar' );

/********************************************************/
// Change “Add title” help text on a custom post type
/********************************************************/
add_filter('gettext', 'custom_enter_title');
function custom_enter_title($input)
{

    global $post_type;

    if (is_admin() && 'Add title' == $input && 'post' == $post_type) {
        return 'Enter Business Name';
    }

    return $input;
}
// https://wordpress.stackexchange.com/questions/6818/change-enter-title-here-help-text-on-a-custom-post-type/#answer-6820

/********************************************************/
// Get next and previous post links, alphabetically by title, across post types
/********************************************************/
add_filter('get_next_post_sort', 'filter_next_and_prev_post_sort');
add_filter('get_previous_post_sort', 'filter_next_and_prev_post_sort');
function filter_next_and_prev_post_sort($sort)
{
    $op = ('get_previous_post_sort' == current_filter()) ? 'DESC' : 'ASC';
    $sort = "ORDER BY p.post_title " . $op . " LIMIT 1";
    return $sort;
}

add_filter('get_next_post_join', 'navigate_in_same_taxonomy_join', 20);
add_filter('get_previous_post_join', 'navigate_in_same_taxonomy_join', 20);
function navigate_in_same_taxonomy_join()
{
    global $wpdb;
    return " INNER JOIN $wpdb->term_relationships AS tr ON p.ID = tr.object_id INNER JOIN $wpdb->term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id";
}

add_filter('get_next_post_where', 'filter_next_and_prev_post_where');
add_filter('get_previous_post_where', 'filter_next_and_prev_post_where');
function filter_next_and_prev_post_where($original)
{
    global $wpdb, $post;
    $where = '';
    $taxonomy = 'category';
    $op = ('get_previous_post_where' == current_filter()) ? '<' : '>';

    if (!is_object_in_taxonomy($post->post_type, $taxonomy)) {
        return $original;
    }

    $term_array = wp_get_object_terms($post->ID, $taxonomy, array('fields' => 'ids'));

    $term_array = array_map('intval', $term_array);

    if (!$term_array || is_wp_error($term_array)) {
        return $original;
    }
    $where = " AND tt.term_id IN (" . implode(',', $term_array) . ")";
    return $wpdb->prepare("WHERE p.post_title $op %s AND p.post_type = %s AND p.post_status = 'publish' $where", $post->post_title, $post->post_type);
}
// https://wordpress.stackexchange.com/questions/204265/next-previous-posts-links-alphabetically-and-from-same-category

/********************************************************/
/* Hide Editor Blocks in Editor */
/********************************************************/
// add_action('init', function () {
//     remove_post_type_support('post', 'editor');
//     // remove_post_type_support( 'page', 'editor' );
// }, 99);
// this is an old function that reverts Gutenbarg to classic Editor

/********************************************************/
/********************************************************/
// 2020 BIM Business Search Child Theme Functions
/********************************************************/
/********************************************************/

/********************************************************/
// BIM Search if condition for certain categories
/********************************************************/
// add_filter('the_content', 'ssws_add_content');
function ssws_add_content($content)
{

    $cat_id   = get_cat_ID('accommodations');
    $children = get_term_children($cat_id, 'category');

    $ssws_custom_text = '<h1>Accomodation</h1>';

    // if (is_single() && has_term('accommodations', 'category')) {
    // if (has_category('accommodations', $post->ID)) {
    if (is_single() && (has_category($cat_id) || has_category($children))) {
        $content .= $ssws_custom_text;
    }
    return $content;
}