<?php
/*
 * Plugin Name: ___RedQ Reuse Form
 * Plugin URI: https://codecanyon.net/item/reactive-pro-advanced-wordpress-search-filtering-grid/17425763/?ref=redqteam
 * Description: A collection of different form component
 * Version: 4.0.5
 * Author: redqteam
 * Author URI: https://codecanyon.net/user/redqteam/portfolio/?ref=redqteam
 * Requires at least: 4.0
 * Tested up to: 4.6
 *
 * Text Domain: reuse-form
 * Domain Path: /languages/
 *
 * Copyright: © 2015-2016 redqteam.
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

/**
 * Class Redq_Reuse
 */
class RedqReuseForm {

  /**
   * @var null
   */
  protected static $_instance = null;

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
    define( 'REUSE_FORM_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
    define( 'REUSE_FORM_URL', untrailingslashit( plugins_url( basename( plugin_dir_path( __FILE__ ) ), basename( __FILE__ ) ) ) );
    define( 'REUSE_FORM_JS', REUSE_FORM_URL .'/assets/dist/js/' );
    define( 'REUSE_FORM_VENDOR', REUSE_FORM_URL .'/assets/dist/vendor/' );
    define( 'REUSE_FORM_CSS', REUSE_FORM_URL .'/assets/dist/css/' );
    define( 'REUSE_FORM_IMG',  REUSE_FORM_URL .'/assets/dist/img/' );
    require_once REUSE_FORM_DIR . '/includes/class-reuse-icons-provider.php';

    add_action( 'plugins_loaded', array( &$this, 'reuse_language_textdomain' ), 1 );
    add_action('admin_enqueue_scripts', array( $this , 'reuse_form_load_scripts' ), 0 );
    add_action('wp_enqueue_scripts', array( $this , 'reuse_form_load_scripts' ), 0 );
    require_once REUSE_FORM_DIR . '/includes/class-redqfw-reuse-form.php';

  }

  /**
   * admin script loading
   *
   * @author redqteam
   * @version 1.0
   * @since 1.0
   *
   * @param $hook
   * @return null
   */
  public function reuse_form_load_scripts($hook) {
    // wp_enqueue_script('media-upload');
    // wp_enqueue_script('thickbox');
    // wp_enqueue_style('thickbox');
    wp_register_script( 'reuse-form-variable', REUSE_FORM_VENDOR.'reuse-form-variable.js', array(), $ver = true, true);
    wp_register_style('icomoon-css', REUSE_FORM_VENDOR.'icomoon.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('icomoon-css');
    wp_register_style('flaticon-css', REUSE_FORM_VENDOR.'flaticon.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('flaticon-css');
    wp_enqueue_script( 'reuse-form-variable' );
    wp_register_script( 'react', REUSE_FORM_VENDOR.'react.min.js', array(), $ver = true, true);
    wp_enqueue_script( 'react' );
    wp_register_script( 'react-dom', REUSE_FORM_VENDOR.'react-dom.min.js', array(), $ver = true, true);
    wp_enqueue_script( 'react-dom' );
    wp_register_style('reuse-form-two', REUSE_FORM_CSS.'reuse-form-two.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('reuse-form-two');
    wp_register_style('reuse-form', REUSE_FORM_CSS.'reuse-form.css', array(), $ver = false, $media = 'all');
    wp_enqueue_style('reuse-form');
    $reuse_form_scripts = new Reuse;
    $reuse_form_scripts->load(REUSE_FORM_JS);

  }


  /**
   * Get the plugin textdomain for multilingual.
   *
   * @author redqteam
   * @version 1.0
   * @since 1.0
   *
   * @return null
   */
  public function reuse_language_textdomain() {
    load_plugin_textdomain( 'reuse-form', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
  }
}

/**
 * Main instance of Reuse.
 *
 * Returns the main instance of REUSE_FORM to prevent the need to use globals.
 *
 * @author redqteam
 * @version 1.0
 * @since  1.0
 *
 * @return Redq_Reuse
 */
function REDQ_REUSE_FORM() {
  return RedqReuseForm::instance();
}

// Global for backwards compatibility.
$GLOBALS['redq_reuse_form'] = REDQ_REUSE_FORM();
