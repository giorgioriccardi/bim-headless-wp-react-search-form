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
// used: https://gist.github.com/giorgioriccardi/c3eb89900e747c15292a70a538b4f730

function ssws_businesses_endpoint_posts($request_data)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'numberposts' => -1,
        'post_category' => array(),
    );

    $posts = get_posts($args);

    // foreach ($posts as $key => $post) {
    //     $posts[$key]->acf = get_fields($post->ID);
    // }
    // return $posts;

    $wpData = [];
    $key = 0;
    // foreach ($posts as $post) {
    foreach ($posts as $key => $post) {
        $wpData[$key]['id'] = $post->ID;
        $wpData[$key]['title'] = $post->post_title;
        $wpData[$key]['content'] = $post->post_content;
        $wpData[$key]['slug'] = $post->post_name;
        $wpData[$key]['categories'] = $post->post_category;
        $wpData[$key]['acf'] = get_fields($post->ID);
        $key++;
    }
    return $wpData;
}

function ssws_businesses_endpoint_slug($slug)
{
    $args = [
        'name' => $slug['slug'],
    ];
    $wpData['slug'] = $post[0]->post_name;

    return $wpData;
}

function ssws_businesses_endpoint_categories($category)
{
    $args = array(
        'post_category' => array(),
    );

    $categories = get_posts($args);

    $wpData = [];
    $key = 0;
    foreach ($categories as $key => $category) {
        $wpData[$key]['id'] = $category->ID;
        $wpData[$key]['title'] = $category->post_title;
        $wpData[$key]['slug'] = $category->post_name;
        $wpData[$key]['post_categories'] = $category->post_category;
        $key++;
    }
    return $wpData;
}

// Disable custom endpoints in favour of WP Rest API
// add_action('rest_api_init', 'register_bim_rest_routes');
function register_bim_rest_routes()
{
    register_rest_route('bim-businesses/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'ssws_businesses_endpoint_posts',
    ));

    register_rest_route('bim-businesses/v1', 'posts/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'ssws_businesses_endpoint_slug',
    ));

    register_rest_route('bim-businesses/v1', 'categories', array(
        'methods' => 'GET',
        'callback' => 'ssws_businesses_endpoint_categories',
    ));
}
// /?rest_route=/bim-businesses/v1/posts

// Export API Data to JSON, another method (BIM version)
add_action('publish_post', 'export_wp_rest_api_data_to_json', 10, 2);
function export_wp_rest_api_data_to_json($ID, $post)
{
    $wp_uri = get_site_url(); // http://bim-business-search.local
    // $bimEndpoint = '/?rest_route=/bim-businesses/v1/posts'; // Disable custom endpoints in favour of WP Rest API
    $bimEndpoint = '/wp-json/wp/v2/posts';

    $url = $wp_uri . $bimEndpoint; // http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts
    // $url = 'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts'; // use this full path variable in case you want to use an absolute path

    $response = wp_remote_get($url);
    $responseData = stripslashes(json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK));

    // the body obj gets wrapped in "[]" like this:
    // "body": "[ ]" which renders as a string, so we have to clean-up the mess with a regex:
    $responseData = str_replace('"[', '[', $responseData); // remove initial quotes
    $responseData = str_replace(']"', ']', $responseData); // remove final quotes

    file_put_contents('wp-content/bimdata/bim_business_data_backup.json', $responseData); // saved under the wp-content/bimdata/
    // http://bim-business-search.local/wp-content/bimdata/bim_business_data_backup.json
}
// https://stackoverflow.com/questions/46082213/wordpress-save-api-json-after-publish-a-post
