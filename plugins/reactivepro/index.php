<?php
/*
* Plugin Name: Reactive Pro
* Plugin URI: https://codecanyon.net/item/reactive-pro-advanced-wordpress-search-filtering-grid/17425763/?ref=redqteam
* Description: Advanced Searching, Filtering & Grid WordPress Plugin
* Version: 4.0.6.3
* Author: redqteam
* Author URI: https://codecanyon.net/user/redqteam/portfolio/?ref=redqteam
* Requires at least: 4.4
* Tested up to: 4.8
*
* Text Domain: reactive
* Domain Path: /languages/
*
* Copyright: © 2016 redqteam.
* License: GNU General Public License v3.0
* License URI: http://www.gnu.org/licenses/gpl-3.0.html
*
*/

if (version_compare(PHP_VERSION, "5.4.0", "<")) {
  function re_version_admin_notice() { ?>
    <div class="error">
      <p><?php _e( 'Sorry this plugin use some <b>PHP VERSION 5.4</b> functionality. If you want to use this plugin please update your server <b>PHP VERSION 5.4</b> or higher.', 'reactive' ); ?></p>
    </div>
    <?php }
    add_action( 'admin_notices', 're_version_admin_notice' );
    return;
  }


  /**
  * Class Redq_reactive
  */
  class Redq_Reactive {

    /**
    * @var null
    */
    protected static $_instance = null;

    public $reactive_settings;


    /**
    * @create instance on self
    */
    public static function instance() {
      if ( is_null( self::$_instance ) ) {
        self::$_instance = new self();
      }
      return self::$_instance;
    }


    public function __construct(){
      $this->re_load_all_classes();
      $this->re_app_bootstrap();
      add_action('plugins_loaded', array($this, 're_language_textdomain' ), 1 );
    }

    /**
    *  App Bootstrap
    *  Fire all class
    */
    public function re_app_bootstrap(){
        /**
         * Define plugin constant
         */
        define( 'RE_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
        define( 'RE_URL', untrailingslashit( plugins_url( basename( plugin_dir_path( __FILE__ ) ), basename( __FILE__ ) ) ) );
        define( 'RE_FILE', dirname(__FILE__));
        define( 'RE_CSS',  RE_URL .'/assets/dist/css/' );
        define( 'RE_JS' ,  RE_URL .'/assets/dist/js/' );
        define( 'RE_IMG',  RE_URL .'/assets/dist/img/' );
        define( 'RE_VEN',  RE_URL .'/assets/dist/ven/' );
        define( 'RE_REUSE_FORM_JS',  RE_URL .'/assets/dist/reuse-form/' );
        define( 'RE_REUSE_FORM_CSS',  RE_URL .'/assets/dist/reuse-form-css/' );
        define( 'RE_TEMPLATE_PATH', plugin_dir_path( __FILE__ ) . 'reactive-templates/' );

        include_once RE_DIR.'/app/reactive-helper-functions.php';

        new Reactive\Admin\Re_Admin_Scripts();
        new Reactive\Admin\Re_Admin_Rebuilder();
        new Reactive\Admin\SaveMeta();
        new Reactive\Admin\Re_Admin_Scripts();
        new Reactive\Admin\Re_Admin();
        new Reactive\Admin\Re_Generator_Metabox();
        new Reactive\Admin\Reactive_Helper();
        new Reactive\Admin\Admin_Column_Builder();



        new Reactive\App\Shortcode();
        new Reactive\App\Scripts();
        new Reactive\App\AsyncHandler();
        include_once RE_TEMPLATE_PATH.'layouts/layout.php';
        include_once RE_TEMPLATE_PATH.'layouts/autosearch-layout.php';
        include_once RE_TEMPLATE_PATH.'layouts/category-layout.php';
        include_once RE_TEMPLATE_PATH.'layouts/map-icon-layout.php';
        include_once RE_TEMPLATE_PATH.'layouts/map-info-layout.php';
        include_once RE_TEMPLATE_PATH.'layouts/preview-popup-layout.php';
    }

    /**
    * Load all the classes with composer auto loader
    *
    * @return void
    */
    public function re_load_all_classes(){
      include_once __DIR__ .DIRECTORY_SEPARATOR . 'vendor' .DIRECTORY_SEPARATOR. 'autoload.php';
    }

    /**
    * Get the template path.
    * @return string
    */
    public function template_path() {
      return apply_filters( 'reactive_template_path', 'reactive/' );
    }

    /**
    * Get the plugin path.
    * @return string
    */
    public function plugin_path() {
      return untrailingslashit( plugin_dir_path( __FILE__ ) );
    }

    /**
    * Get the plugin textdomain for multilingual.
    * @return null
    */
    public function re_language_textdomain() {
      load_plugin_textdomain( 'reactive', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

  }

  /**
  * Main instance of Reactive.
  *
  * Returns the main instance of RE to prevent the need to use globals.
  *
  * @since  1.0
  * @return Redq_Reactive
  */
  function RE() {
    return Redq_Reactive::instance();
  }

  // Global for backwards compatibility.
  $GLOBALS['reactive'] = RE();

  register_activation_hook( __FILE__, 'reactive_activation_init_func' );
  function reactive_activation_init_func() {
    // Add the admin notice notifier during plugin activation. Default set to false.
    add_option('reactive_builder_admin_notices', false);
    $webpack_public_path = get_option('webpack_public_path_url', true);
    if($webpack_public_path == '' || $webpack_public_path == '1'){
      update_option('webpack_public_path_url', RE_REUSE_FORM_JS);
    }
    global $wpdb;
    $collate = '';
    if ( $wpdb->has_cap( 'collation' ) ) {
      if ( ! empty( $wpdb->charset ) ) {
        $collate .= "DEFAULT CHARACTER SET $wpdb->charset";
      }
      if ( ! empty( $wpdb->collate ) ) {
        $collate .= " COLLATE $wpdb->collate";
      }
    }
    $schema = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}re_lat_lng (
      id bigint(200) unsigned NOT NULL,
      lat varchar(255),
      lng varchar(255),
      country varchar(255),
      city varchar(255),
      zipcode varchar(255),
      state varchar(255),
      country_short_name varchar(255),
      state_short_name varchar(255),
      formatted_address varchar(255),
      PRIMARY KEY  (id)
    ) $collate;";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta($schema);

    // check if reactive grid has posts or not

    $args = array(
      array(
        'post_type'     => 'reactive_grid',
        'posts_per_page' =>  -1,
        'xml_path' => 'grid.xml'
      ),
      array(
        'post_type'     => 'reactive_category',
        'posts_per_page' =>  -1,
        'xml_path' => 'category.xml'
      ),
      array(
        'post_type'     => 'reactive_map_marker',
        'posts_per_page' =>  -1,
        'xml_path' => 'map_marker.xml'
      ),
      array(
        'post_type'     => 'reactive_map_info',
        'posts_per_page' =>  -1,
        'xml_path' => 'map_info.xml'
      ),
      array(
        'post_type'     => 'reactive_layouts',
        'posts_per_page' =>  -1,
        'xml_path' => 'search_layout.xml'
      ),
      array(
        'post_type'     => 're_preview_popup',
        'posts_per_page' =>  -1,
        'xml_path' => 'preview_popup.xml'
      ),
      array(
        'post_type'     => 'autosearch_template',
        'posts_per_page' =>  -1,
        'xml_path' => 'autosearch_template.xml'
      )
    );

    // auto_import( $args );
    if ( ! defined( 'WP_LOAD_IMPORTERS' ) ) { define( 'WP_LOAD_IMPORTERS', true ); }
    // Load Importer API
    require_once ABSPATH . 'wp-admin/includes/import.php';
    if ( ! class_exists( 'WP_Importer' ) ) {
      $class_wp_importer = ABSPATH . 'wp-admin/includes/class-wp-importer.php';
      if ( file_exists( $class_wp_importer ) ) {
        require $class_wp_importer;
      }
    }
    if ( !class_exists( 'WP_Import' ) ) {
      $class_wp_importer = RE_DIR .'/reactive-importer.php';
      if ( file_exists( $class_wp_importer ) ) {
        require $class_wp_importer; }
    }
    if ( class_exists( 'WP_Import' ) ) {
      require_once RE_DIR .'/reactive-grid-import.php';
      $wp_import = new Reactive_content_import();
      $wp_import->fetch_attachments = true;
      ob_start();
      foreach ($args as $key => $single_args) {
        $template_data = array();
        $template_data = get_posts($single_args);
        if(!isset($template_data) || empty($template_data)) {
          $wp_import->import( RE_DIR . '/import/'.$single_args['xml_path'] );
        }
      }
      $message = ob_get_clean();
      return array( $wp_import->check(),$message );
    }
  }
