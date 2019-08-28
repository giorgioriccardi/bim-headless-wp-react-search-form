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

    $wpData = [];
    $i = 0;
    // foreach ($posts as $post) {
    foreach ($posts as $i => $post) {
        $wpData[$i]['id'] = $post->ID;
        $wpData[$i]['title'] = $post->post_title;
        $wpData[$i]['content'] = $post->post_content;
        $wpData[$i]['slug'] = $post->post_name;
        $wpData[$i]['acf'] = get_fields($post->ID);
        $i++;
    }
    return $wpData;
}

function ssws_businesses_endpoint_slug($slug)
{
    $args = [
        'name' => $slug['slug'],
        'post_type' => 'post',
    ];
    $post = get_posts($args);
    $wpData['id'] = $post[0]->ID;
    $wpData['title'] = $post[0]->post_title;
    $wpData['content'] = $post[0]->post_content;
    $wpData['slug'] = $post[0]->post_name;
    $wpData['acf'] = get_fields($post[0]->ID);

    return $wpData;
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
// add_action('wp_loaded', 'ssws_update_draft_posts_to_publish');
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
// note that this function will not publish custom fields unless
// the double click publish button is disabled in the Gutenberg options
// by default Gutenberg will ask to re-click the publish button to make sure you checked everything twice (rather annoying!)

function export_posts_in_json_2()
{
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);
    $data = json_encode($posts);
    $folder = 'http://bim-business-search.local/wp-content/themes/twentynineteen-child/';
    $file_name = date('Y-m-d') . '.json';
    file_put_contents($folder . $file_name, $data);
}
// add_action('save_post', 'export_posts_in_json_2');
// https://stackoverflow.com/questions/43787499/wordpress-rest-api-write-to-json-file

/*
Plugin Name: Export to JSON
Author: Achilleas X.
Author URI: http://wordpress.stackexchange.com/users/90258/
Description: Every time you save,update or delete a post, all the published post are getting saved in a JSON file in the uploads directory. Have in mind that by default it only exports "title - excerpt - author" , but you can add whatever else you want.
 */
function export_posts_in_json()
{
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);
    $posts = array();
    while ($query->have_posts()): $query->the_post();
        $posts[] = array(
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'author' => get_the_author(),
        );
    endwhile;
    wp_reset_query();
    $data = json_encode($posts);
    $upload_dir = wp_get_upload_dir(); // set to save in the /wp-content/uploads folder
    $file_name = date('Y-m-d') . '.json';
    $save_path = $upload_dir['basedir'] . '/' . $file_name;

    $f = fopen($save_path, "w"); //if json file doesn't gets saved, comment this and uncomment the one below
    //$f = @fopen( $save_path , "w" ) or die(print_r(error_get_last(),true)); //if json file doesn't gets saved, uncomment this to check for errors
    fwrite($f, $data);
    fclose($f);

}
add_action('save_post', 'export_posts_in_json');
// https://wordpress.stackexchange.com/questions/232708/export-all-post-from-database-to-json-only-when-the-database-gets-updated

// add_action('publish_post', function ($ID, $post) {
    $url = 'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts';
    $response = wp_remote_get($url);
    $responseData = json_encode($response);
    file_put_contents('data.json', $responseData);
}, 10, 2);
// https://stackoverflow.com/questions/46082213/wordpress-save-api-json-after-publish-a-post

function export_users_to_json()
{
    global $wpdb;

    $query = "SELECT * FROM wp_users";
    $users = $wpdb->get_results($query, ARRAY_A);
    $json = json_encode($users);
    file_put_contents('users_export.json', $json);
}
// add_action('wp_loaded', 'export_users_to_json');
