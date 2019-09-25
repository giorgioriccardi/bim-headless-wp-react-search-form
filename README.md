# bim-headless-wp-react-search-form

A headless WP installation with a React frontend search form fetching data from remote custom REST API json

## TODO

- ~~WP installation with 2019 child-theme~~
- use ACF for custom fields
- ~~custom REST endpoints~~
- ~~create post from CF7 form sumbit~~
- ~~publish posts automatically~~
- React app to fetch WP data and display search form
- ~~add ACF export json data~~
- change React default logos and favicon in public folder
- ~~add ACF to REST API plugin to show AFC endpoints in default WP rest~~
- Evaluate this plugin for future Gmaps implementation [Google Map for Contact Form 7](https://wordpress.org/plugins/cf7-google-map/)
- Styles using Burma sass
- update snippets and documentation
- add note about switching ACF business_address from text to gmaps, having the address posted in the content by default so it can be easily copied over when the field is again a gmap.
- the first form you create and you hook with CF7 to Post, it does not recognize the ACF fields; if it happens just create a dummy form create a dummy record, save it and the next form you create should recognize ACF fields.
- write programmatic error handling for missing ACF fields values
- validate CF7 phone number field
- make links for website, email, phone #
- ..
- ...

## Instructions

- clone this [repo](https://github.com/giorgioriccardi/bim-headless-wp-react-search-form) in the root of your WP installation
- move all repo files and folders within wp-content folder
- make sure to clean-up plugins and themes that we are not going to use
- or alternatively list all those plugins and themes in `.gitignore`
- create a WP2019 child-theme
- install [ACF](https://wordpress.org/plugins/advanced-custom-fields/) and [CF7](https://wordpress.org/plugins/contact-form-7/) plugins
- create custom fields in ACF for the React search form and for the CF7 input form

  - `business_name`
  - `business_owner`
  - `business_contact`
  - `business_address` this will require a **GMAPS API Key** and a function(s) to [enable GMaps in ACF](https://www.advancedcustomfields.com/resources/google-map/)

    ```
    function ssws_enqueue_files()
    {
        wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyBjDsJj-aXpawLG_MPPZZcpjOYvdoZGsPY', null, '1.0', true);
        // don't bother copying this API Key, has been cancelled and the new one is restricted!
    }
    add_action('wp_enqueue_scripts', 'ssws_enqueue_files');

    function sswsGoogleMapKey($api)
    {
        $api['key'] = 'AIzaSyBjDsJj-aXpawLG_MPPZZcpjOYvdoZGsPY';
        // don't bother copying this API Key, has been cancelled and the new one is restricted!
        return $api;
    }
    add_filter('acf/fields/google_map/api', 'sswsGoogleMapKey');
    // https://www.advancedcustomfields.com/resources/google-map/
    ```

  - `business_category` // from a dropdown list
  - `business_etc...`

- add custom endpoints in `functions.php` for `/?rest_route=/bim-businesses/v1/posts`

```
// Custom ACF endpoint for headless wp-react app
function ssws_businesses_endpoint($request_data)
{
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'numberposts' => -1,
    );

    $posts = get_posts($args);

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
```

- Optional: add [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) plugin to show ACF endpoints in default WP rest
- add [Post My CF7 Form](https://wordpress.org/plugins/post-my-contact-form-7/) plugin
- config the CF7 form to reflect the data structure and custom fields
- create a react app within `wp-content`with `npx create-react-app bimsearch`
- install react dependencies `cd bimsearch` and `npm i axios react-router-dom` to fetch our json data (or make our requests) and to navigate to the single business page
- Add Burma and Sass `yarn add bulma` , `yarn add node-sass`
- Create a file `App.sass` and add to App.js `import './App.sass';`
- run `yarn start` and after `yarn build` to test live if it's running
- add to `package.json` `"homepage" : "http://72fa633e.ngrok.io/wp-content/bimsearch/build"` (this is my live FlyWheel url!)
- test url at [http://72fa633e.ngrok.io/wp-content/bimsearch/build](http://72fa633e.ngrok.io/wp-content/bimsearch/build)
- **the FlyWheel url changes all the time!**
- _remember to disable comments and to make the WP installation non indexable by search engines, after all is a headless web application!_
- include in `package.json` a proxy so we don't have to include it in all our requests `"proxy": "http://localhost:8000"`, though in this case we fetch the data not from local but from another url!
