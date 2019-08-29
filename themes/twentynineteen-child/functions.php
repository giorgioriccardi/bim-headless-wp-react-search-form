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
// add_action('init', 'ssws_update_draft_posts_to_publish');
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

// Hook acf/save_post applied to all custom fields
add_action('acf/save_post', 'save_post', 20);

function save_post($post_id)
{
    // check if is autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        // verify nonce
        if (isset($_POST['acf_nonce'], $_POST['fields']) && wp_verify_nonce($_POST['acf_nonce'], 'input')) {
            // update the post (may even be a revision / autosave preview)
            do_action('acf/save_post', $post_id);
        }
    }

    // Remove the hook to avoid infinite loop. Please make sure that it has
    // the same priority (20)
    remove_action('acf/save_post', 'save_post', 20);

    // Update the post
    wp_update_post($new_post);

    // Add the hook back
    add_action('acf/save_post', 'save_post', 20);
}
// https://support.advancedcustomfields.com/forums/topic/hook-acfsave_post-not-applied-for-all/#post-45195

add_action('save_post', 'my_autosave_acf');

function my_autosave_acf($post_id)
{

    // check if is autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {

        // verify nonce
        if (isset($_POST['acf_nonce'], $_POST['fields']) && wp_verify_nonce($_POST['acf_nonce'], 'input')) {

            // update the post (may even be a revision / autosave preview)
            do_action('acf/save_post', $post_id);
        }
    }
}
// https://github.com/elliotcondon/acf/issues/585

// Export API Data to JSON, another method (BIM version)
add_action('publish_post', 'export_wp_rest_api_data_to_json', 10, 2);
function export_wp_rest_api_data_to_json($ID, $post)
{
    $wp_uri = get_site_url();
    $bimEndpoint = '/?rest_route=/bim-businesses/v1/posts';
    $url = $wp_uri . $bimEndpoint; // http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts
    // $url = 'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts'; // use this full path variable in case you want to use an absolute path
    $response = wp_remote_get($url);
    $responseData = json_encode($response); // saved under the wp root installation
    file_put_contents('bim_business_data_backup.json', $responseData);
}
// https://stackoverflow.com/questions/46082213/wordpress-save-api-json-after-publish-a-post
