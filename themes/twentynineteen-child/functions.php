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
    wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/js/script.js', array('jquery'), '1.0', true);
}

// Create a web app using WordPress and React
// https://medium.com/free-code-camp/wordpress-react-how-to-create-a-modern-web-app-using-wordpress-ef6cc6be0cd0#b8b4

// Custom ACF endpoint for headless wp-react app
// https://snipcart.com/blog/reactjs-wordpress-rest-api-example

function ssws_business_endpoint($request_data)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'numberposts' => -1,
    );
    $posts = get_posts($args);
    foreach ($posts as $key => $post) {
        $posts[$key]->acf = get_fields($post->ID);
    }
    return $posts;
}
add_action('rest_api_init', function () {
    register_rest_route('bim-business/v1', '/posts/', array(
        'methods' => 'GET',
        'callback' => 'ssws_business_endpoint',
    ));
});
// /?rest_route=/bim-business/v1/posts