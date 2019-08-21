<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://syllogic.in
 * @since             1.0.0
 * @package           Cf7_GoogleMap
 *
 * @wordpress-plugin
 * Plugin Name:       Google Map for Contact Form 7
 * Plugin URI:        https://github.com/aurovrata/cf7-google-map
 * Description:       Allows a map field to be included in a Contact Form 7 for use to drag and drop their location
 * Version:           1.4.2
 * Author:            Aurovrata V.
 * Author URI:        http://syllogic.in
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cf7-google-map
 * Domain Path:       /languages
 * GitHub Plugin URI: https://github.com/aurovrata/cf7-google-map
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
define( 'CF7_GOOGLE_MAP_VERSION', '1.4.2' );
/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cf7-googleMap-activator.php
 */
function activate_cf7_googleMap() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cf7-googleMap-activator.php';
	Cf7_GoogleMap_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cf7-googleMap-deactivator.php
 */
function deactivate_cf7_googleMap() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cf7-googleMap-deactivator.php';
	Cf7_GoogleMap_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_cf7_googleMap' );
register_deactivation_hook( __FILE__, 'deactivate_cf7_googleMap' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-cf7-googleMap.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_cf7_googleMap() {

	$plugin = new Cf7_GoogleMap(CF7_GOOGLE_MAP_VERSION);
	$plugin->run();

}
run_cf7_googleMap();
