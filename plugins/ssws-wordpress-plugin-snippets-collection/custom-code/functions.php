<?php
/**
 * Functions.php
 *
 * @package  WP_Customization
 * @author   SSWS - Giorgio Riccardi
 * @since    1.3.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * functions.php
 * Add PHP snippets here
 */

/********************************************************/
// Install Google Analytics in WordPress
/********************************************************/
if (!function_exists('ssws_Add_GoogleAnalytics')) {

    // add_action('wp_footer', 'ssws_Add_GoogleAnalytics');
    function ssws_Add_GoogleAnalytics()
    {
        // wrap the GA code in an if condition to match only live site url
        // if ($_SERVER['HTTP_HOST']==="your-local.site" || $_SERVER['HTTP_HOST']==="www.your-local.site") { // local
        if ($_SERVER['HTTP_HOST'] === "your-live-site.com" || $_SERVER['HTTP_HOST'] === "www.your-live-site.com") { // production
            if (@$_COOKIE["COOKIENAME"] !== "COOKIEVALUE") {
                // Insert Analytics Code Here
                ?>
                <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-xxxxxx-x', 'auto');
                ga('send', 'pageview');

                </script>
            <?php
}
        }
    }

}
// this needs to be implemented with a custom input field into WP dashboard so the GA code/snippet is unrelated to the theme and not hardcoded into the plugin function.

/********************************************************/
// Enqueue GMAPS API Key and store into variable
/********************************************************/
if (!function_exists('ssws_enqueue_files')) {

    function ssws_enqueue_files()
    {
        wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyBjDsJj-aXpawLG_MPPZZcpjOYvdoZGsPY', null, '1.0', true); // don't bother copying this API Key, is restricted!
    }
    add_action('wp_enqueue_scripts', 'ssws_enqueue_files');
}

if (!function_exists('sswsGoogleMapKey')) {
    function sswsGoogleMapKey($api)
    {
        $api['key'] = 'AIzaSyBjDsJj-aXpawLG_MPPZZcpjOYvdoZGsPY'; // don't bother copying this API Key, is restricted!
        return $api;
    }
    add_filter('acf/fields/google_map/api', 'sswsGoogleMapKey');

}
// this needs to be implemented with a custom input field into WP dashboard so the GM code/snippet is unrelated to the theme and not hardcoded into the plugin function.

/********************************************************/
// Customize Login Screen ver. 3.0
/********************************************************/

if (!function_exists('ssws_custom_login_fnc_container')) {

    function ssws_custom_login_fnc_container()
    {
        add_filter('login_headerurl', 'SSWSHeaderUrl');
        function SSWSHeaderUrl()
        {
            return esc_url(site_url('/'));
        }
        add_action('login_enqueue_scripts', 'SSWSLoginCSS');
        function SSWSLoginTitle()
        {
            return get_bloginfo('name');
        }
        function SSWSLoginCSS()
        {
            wp_enqueue_style('ssws_main_styles', get_stylesheet_uri());
            wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
        }
        add_filter('login_headertitle', 'SSWSLoginTitle');
    }

}

/********************************************************/
// Automatically set the image Title, Alt-Text, Caption & Description upon upload
/********************************************************/
if (!function_exists('ssws_set_image_meta_upon_image_upload')) {

    add_action('add_attachment', 'ssws_set_image_meta_upon_image_upload');
    function ssws_set_image_meta_upon_image_upload($post_ID)
    {
        // Check if uploaded file is an image, else do nothing

        if (wp_attachment_is_image($post_ID)) {

            $ssws_image_title = get_post($post_ID)->post_title;

            // Sanitize the title:  remove hyphens, underscores & extra spaces:
            $ssws_image_title = preg_replace('%\s*[-_\s]+\s*%', ' ', $ssws_image_title);

            // Sanitize the title:  capitalize first letter of every word (other letters lower case):
            $ssws_image_title = ucwords(strtolower($ssws_image_title));

            // Create an array with the image meta (Title, Caption, Description) to be updated
            // Note:  comment out the Excerpt/Caption or Content/Description lines if not needed
            $ssws_image_meta = array(
                'ID' => $post_ID, // Specify the image (ID) to be updated
                'post_title' => $ssws_image_title, // Set image Title to sanitized title
                // 'post_excerpt'    => $ssws_image_title,        // Set image Caption (Excerpt) to sanitized title
                // 'post_content'    => $ssws_image_title,        // Set image Description (Content) to sanitized title
            );

            // Set the image Alt-Text
            update_post_meta($post_ID, '_wp_attachment_image_alt', $ssws_image_title);

            // Set the image meta (e.g. Title, Excerpt, Content)
            wp_update_post($ssws_image_meta);

        }
    }

}
// http://brutalbusiness.com/automatically-set-the-wordpress-image-title-alt-text-other-meta/

/********************************************************/
// Allow SVG through WordPress Media Uploader
/********************************************************/
if (!function_exists('ssws_mime_types')) {

    function ssws_mime_types($mimes)
    {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
    // add_filter('upload_mimes', 'ssws_mime_types');

}
// not working anymore from WP 5.x
// check https://wordpress.org/plugins/safe-svg/

/********************************************************/
// ----------
/********************************************************/