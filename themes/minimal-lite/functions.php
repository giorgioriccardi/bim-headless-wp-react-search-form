<?php
/**
 * Minimal Lite functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Minimal_Lite
 */

if ( ! function_exists( 'minimal_lite_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function minimal_lite_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Minimal Lite, use a find and replace
		 * to change 'minimal-lite' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'minimal-lite', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'minimal-lite' ),
			'social-nav' => esc_html__( 'Social Nav', 'minimal-lite' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'minimal_lite_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );

         /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support( 'post-formats', array(
            'image',
            'video',
            'quote',
            'gallery',
            'audio',
        ) );

        add_image_size( 'minimal-lite-medium-img', 480 );

    }
endif;
add_action( 'after_setup_theme', 'minimal_lite_setup' );


/**
 * OCDI files.
 *
 * @since 1.0.0
 *
 * @return array Files.
 */
function minimal_lite_import_files() {
    return array(
        array(
            'import_file_name'             =>  esc_html__( 'Default Theme Demo Content', 'minimal-lite' ),
            'local_import_file'            => trailingslashit( get_template_directory() ) . 'demo-data/default/minimal-lite.xml',
            'local_import_widget_file'     => trailingslashit( get_template_directory() ) . 'demo-data/default/minimal-lite.wie',
            'local_import_customizer_file' => trailingslashit( get_template_directory() ) . 'demo-data/default/minimal-lite.dat',
            'import_preview_image_url'   => trailingslashit( get_template_directory_uri() ) . 'demo-data/image/minimal-lite.jpg',
        ),
        array(
            'import_file_name'             =>  esc_html__( 'Fashion Theme Demo Content', 'minimal-lite' ),
            'local_import_file'            => trailingslashit( get_template_directory() ) . 'demo-data/fashion/minimal-lite-fashion.xml',
            'local_import_widget_file'     => trailingslashit( get_template_directory() ) . 'demo-data/fashion/minimal-lite-fashion.wie',
            'local_import_customizer_file' => trailingslashit( get_template_directory() ) . 'demo-data/fashion/minimal-lite-fashion.dat',
            'import_preview_image_url'   => trailingslashit( get_template_directory_uri() ) . 'demo-data/image/minimal-lite-fashion.jpg',
        ),
        array(
            'import_file_name'             =>  esc_html__( 'Fashion Theme Demo Content', 'minimal-lite' ),
            'local_import_file'            => trailingslashit( get_template_directory() ) . 'demo-data/travel/minimal-lite-travel.xml',
            'local_import_widget_file'     => trailingslashit( get_template_directory() ) . 'demo-data/travel/minimal-lite-travel.wie',
            'local_import_customizer_file' => trailingslashit( get_template_directory() ) . 'demo-data/travel/minimal-lite-travel.dat',
            'import_preview_image_url'   => trailingslashit( get_template_directory_uri() ) . 'demo-data/image/minimal-lite-travel.jpg',
        ),
    );
}
add_filter( 'pt-ocdi/import_files', 'minimal_lite_import_files' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function minimal_lite_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'minimal_lite_content_width', 640 );
}
add_action( 'after_setup_theme', 'minimal_lite_content_width', 0 );

/**
 * function for google fonts
 */
if (!function_exists('minimal_lite_fonts_url')) :

    /**
     * Return fonts URL.
     *
     * @since 1.0.0
     * @return string Fonts URL.
     */
    function minimal_lite_fonts_url(){
        
        $fonts_url = '';
        $fonts = array();

        $minimal_lite_primary_font   = minimal_lite_get_option('primary_font',true);
        $minimal_lite_secondary_font = minimal_lite_get_option('secondary_font',true);

        $minimal_lite_fonts   = array();
        $minimal_lite_fonts[] = $minimal_lite_primary_font;
        $minimal_lite_fonts[] = $minimal_lite_secondary_font;

        for ($i = 0; $i < count($minimal_lite_fonts); $i++) {

            if ('off' !== sprintf(_x('on', '%s font: on or off', 'minimal-lite'), $minimal_lite_fonts[$i])) {
                $fonts[] = $minimal_lite_fonts[$i];
            }

        }

        if ($fonts) {
            $fonts_url = add_query_arg(array(
                'family' => urldecode(implode('|', $fonts)),
            ), 'https://fonts.googleapis.com/css');
        }

        return $fonts_url;
    }
endif;

/**
 * Enqueue scripts and styles.
 *
 * @since Minimal Lite 1.0
 *
 */
function minimal_lite_scripts() {

    $min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

    wp_enqueue_style('ionicons', get_template_directory_uri() . '/assets/lib/ionicons/css/ionicons' . $min . '.css');
    wp_enqueue_style('bootstrap', get_template_directory_uri() . '/assets/lib/bootstrap/css/bootstrap' . $min . '.css');
    wp_enqueue_style('magnific-popup', get_template_directory_uri().'/assets/lib/magnific-popup/magnific-popup.css');
    wp_enqueue_style('slick', get_template_directory_uri() . '/assets/lib/slick/css/slick' . $min . '.css');
    wp_enqueue_style('sidr-nav', get_template_directory_uri() . '/assets/lib/sidr/css/jquery.sidr.dark.css');
    wp_enqueue_style( 'wp-mediaelement' );
    wp_enqueue_style( 'minimal-lite-style', get_stylesheet_uri() );
    wp_add_inline_style('minimal-lite-style', minimal_lite_inline_css());
    $fonts_url = minimal_lite_fonts_url();
    if (!empty($fonts_url)) {
        wp_enqueue_style('minimal-lite-google-fonts', $fonts_url, array(), null);
    }

    wp_enqueue_script( 'minimal-lite-skip-link-focus-fix', get_template_directory_uri() . '/assets/thememattic/js/skip-link-focus-fix.js', array(), '20151215', true );
    wp_enqueue_script('jquery-bootstrap', get_template_directory_uri() . '/assets/lib/bootstrap/js/bootstrap' . $min . '.js', array('jquery'), '', true);
    wp_enqueue_script('jquery-slick', get_template_directory_uri() . '/assets/lib/slick/js/slick' . $min . '.js', array('jquery'), '', true);
    wp_enqueue_script('jquery-magnific-popup', get_template_directory_uri().'/assets/lib/magnific-popup/jquery.magnific-popup'.$min.'.js', array('jquery'), '', true);
    wp_enqueue_script('sidr', get_template_directory_uri() . '/assets/lib/sidr/js/jquery.sidr' . $min . '.js', array('jquery'), '', true);
    wp_enqueue_script( 'imagesloaded' );
    wp_enqueue_script('masonry');
    wp_enqueue_script('theiaStickySidebar', get_template_directory_uri() . '/assets/lib/theiaStickySidebar/theia-sticky-sidebar.min.js', array('jquery'), '', true);


    $args = minimal_lite_get_localized_variables();

	wp_enqueue_script('color-switcher', get_template_directory_uri() . '/assets/thememattic/js/color-switcher.js', array('jquery'), '', true);
	wp_enqueue_script('script', get_template_directory_uri() . '/assets/thememattic/js/script.js', array( 'jquery', 'wp-mediaelement' ), '', true);
    wp_localize_script( 'script', 'writeBlogVal', $args );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'minimal_lite_scripts' );

/**
 * Enqueue admin scripts and styles.
 *
 * @since Minimal Lite 1.0
 */
function minimal_lite_admin_scripts($hook){
    if ('widgets.php' === $hook) {
        wp_enqueue_media();
        wp_enqueue_script('minimal_lite-widgets-js', get_template_directory_uri() . '/assets/thememattic/js/widgets.js', array('jquery','wp-util'), '1.0.0', true);
        wp_enqueue_style('minimal_lite-widgets-css', get_template_directory_uri() . '/assets/thememattic/css/widgets.css');

    }
}
add_action('admin_enqueue_scripts', 'minimal_lite_admin_scripts');

/**
 * Print admin widget styles.
 *
 * @since Minimal Lite 1.0
 */
function minimal_lite_widget_styles(){
   ?>
    <style>
        .me-widefat{
            border-spacing: 0;
            width: 90%;
            clear: both;
            margin: 5px 0;
        }
        .me-remove-youtube-url{
            color: red;
            cursor: pointer;
        }
    </style>
<?php
}
add_action( "admin_print_styles-widgets.php", 'minimal_lite_widget_styles' );

/**
 * Add featured image as background image to post navigation elements.
 *
 * @since Minimal Lite 1.0
 *
 */
function minimal_lite_post_nav_background() {
    if ( ! is_single() ) {
        return;
    }

    $previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
    $next     = get_adjacent_post( false, '', false );
    $css      = '';

    if ( is_attachment() && 'attachment' == $previous->post_type ) {
        return;
    }

    if ( $previous &&  has_post_thumbnail( $previous->ID ) ) {
        $prevthumb = wp_get_attachment_image_src( get_post_thumbnail_id( $previous->ID ), 'post-thumbnail' );
        $css .= '
			.post-navigation .nav-previous { background-image: url(' . esc_url( $prevthumb[0] ) . '); }
			.post-navigation .nav-previous .post-title, .post-navigation .nav-previous a:hover .post-title, .post-navigation .nav-previous .meta-nav { color: #fff; }
			.post-navigation .nav-previous a:before { background-color: rgba(0, 0, 0, 0.4); }
		';
    }

    if ( $next && has_post_thumbnail( $next->ID ) ) {
        $nextthumb = wp_get_attachment_image_src( get_post_thumbnail_id( $next->ID ), 'post-thumbnail' );
        $css .= '
			.post-navigation .nav-next { background-image: url(' . esc_url( $nextthumb[0] ) . '); border-top: 0; }
			.post-navigation .nav-next .post-title, .post-navigation .nav-next a:hover .post-title, .post-navigation .nav-next .meta-nav { color: #fff; }
			.post-navigation .nav-next a:before { background-color: rgba(0, 0, 0, 0.4); }
		';
    }

    wp_add_inline_style( 'minimal-lite-style', $css );
}
add_action( 'wp_enqueue_scripts', 'minimal_lite_post_nav_background' );

function minimal_lite_get_customizer_value(){
    global $minimal_lite;
    $minimal_lite = minimal_lite_get_options();
}
add_action('init','minimal_lite_get_customizer_value');

/**
 * Load all required files.
 */
require get_template_directory() . '/inc/init.php';

//* Add description to menu items
add_filter( 'walker_nav_menu_start_el', 'minimallite_add_description', 10, 2 );
function minimallite_add_description( $item_output, $item ) {
    $description = $item->post_content;
    if (('' !== $description) && (' ' !== $description) ) {
        return preg_replace( '/(<a.*)</', '$1' . '<span class="menu-description">' . $description . '</span><', $item_output) ;
    }
    else {
        return $item_output;
    };
}
