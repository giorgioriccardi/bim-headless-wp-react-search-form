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

function ssws_businesses_endpoint($request_data)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'numberposts' => -1,
    );

    $posts = get_posts($args);

    // foreach ($posts as $key => $post) {
    //     $posts[$key]->acf = get_fields($post->ID);
    // }
    // return $posts;

    $data = [];
    $i = 0;
    foreach ($posts as $post) {
        $data[$i]['id'] = $post->ID;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['content'] = $post->post_content;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['acf'] = get_fields($post->ID);
        $i++;
    }
    return $data;
}

function ssws_businesses_endpoint_slug($slug)
{
    $args = [
        'name' => $slug['slug'],
        'post_type' => 'post',
    ];
    $post = get_posts($args);
    $data['id'] = $post[0]->ID;
    $data['title'] = $post[0]->post_title;
    $data['content'] = $post[0]->post_content;
    $data['slug'] = $post[0]->post_name;
    $data['acf'] = get_fields($post[0]->ID);

    return $data;
}

add_action('rest_api_init', function () {
    register_rest_route('bim-businesses/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'ssws_businesses_endpoint',
    ));

    register_rest_route('bim-businesses/v1', 'posts/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'ssws_businesses_endpoint_slug',
    ));
});
// /?rest_route=/bim-businesses/v1/posts

// Set all posts status to published, so when submit CF7 form it gets published right away

add_action('init', 'ssws_update_draft_posts_to_publish');

function ssws_update_draft_posts_to_publish()
{
    $args = array('post_type' => 'post',
        'post_status' => 'draft',
        'posts_per_page' => -1,
    );
    $published_posts = get_posts($args);

    foreach ($published_posts as $post_to_draft) {
        $query = array(
            'ID' => $post_to_draft->ID,
            'post_status' => 'publish',
        );
        wp_update_post($query, true);
    }
}
