# bim-headless-wp-react-search-form

A headless WP installation with a React frontend search form fetching data from remote custom REST API json

## TODO

- ~~WP installation with 2019 child-theme~~
- use ACF for custom fields
- ~~custom REST endpoints~~
- create post from CF7 form sumbit
- ~~publish posts automatically~~
- React app to fetch WP data and display search form
- ~~add ACF export json data~~
- ...

## Instructions

- clone this repo in the root of your WP installation
- move all repo files and folders within wp-content folder
- make sure to clean up plugins and themes that we are not using
- or alternatively add all those plugins and themes in `.gitignore`
- create a WP2019 child-theme
- install [ACF](https://wordpress.org/plugins/advanced-custom-fields/) and [CF7](https://wordpress.org/plugins/contact-form-7/) plugins
- create custom fields in ACF for the React search form and for the CF7 input form
  - `business_name`
  - `business_owner`
  - `business_contact`
  - `business_address`
  - `business_etc..`
- add custom endpoints in `functions.php` for `/?rest_route=/bim-business/v1/posts`

```
// Custom ACF endpoint for headless wp-react app
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
```

- add [Post My CF7 Form](https://wordpress.org/plugins/post-my-contact-form-7/) plugin
