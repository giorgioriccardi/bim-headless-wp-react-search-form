<?php

namespace Reactive\Admin;


/**
 * Class Re_Admin
 * @package Reactive\Admin
 */
class Re_Admin {
  /**
     * class constructor
     * @version 1.0.0
     * @since 1.0.0
     */
    public function __construct(){
    add_action( 'admin_menu', array( $this , 're_admin_menu')  );
  }

  public function re_admin_menu() {

    add_menu_page( $page_title = 'Reactive', $menu_title = 'Reactive', $capability = 'manage_options', $menu_slug = 'reactive_admin', $function =  array( $this , 're_admin_main_menu_options'),$icon_url = 'dashicons-screenoptions', 86 );

    add_menu_page( $page_title = 'Reactive Templates', $menu_title = 'Reactive Templates', $capability = 'manage_options', $menu_slug = 'reactive_templates', $function =  array( $this , 're_admin_templates_options'),$icon_url = 'dashicons-screenoptions', 87 );

    add_submenu_page( $parent_slug = 'reactive_admin', $page_title = 'Geobox', $menu_title='Geobox', $capability = 'manage_options', $menu_slug = 'reactive_geobox', $function = array($this , 're_admin_geobox') );
    add_submenu_page( $parent_slug = 'reactive_admin', $page_title = 'Settings', $menu_title='Settings', $capability = 'manage_options', $menu_slug = 'reactive_settings', $function = array($this , 're_admin_settings') );

    add_submenu_page( $parent_slug = 'reactive_admin', $page_title = 'Meta Restrictions', $menu_title='Meta Restrictions', $capability = 'manage_options', $menu_slug = 'meta_restrictions', $function = array($this , 're_admin_meta_restrictions') );

    add_submenu_page( $parent_slug = 'reactive_admin', $page_title = 'System Status', $menu_title='System Status', $capability = 'manage_options', $menu_slug = 'reactive_status', $function = array($this , 're_admin_status') );
  }

  /**
   *
   */
  public function re_admin_main_menu_options(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }
    include_once 'admin-template/reactive-admin.php';
  }

  public function re_admin_templates_options(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }
    include_once 'admin-template/reactive-templates.php';
  }

  public function re_admin_geobox(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }

    include_once 'admin-template/reactive-geobox-settings.php';
  }
  public function re_admin_settings(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }

    include_once 'admin-template/reactive-general-settings.php';
  }
  public function re_admin_meta_restrictions(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }
    include_once 'admin-template/reactive-meta-restrictions.php';
  }

  public function re_admin_status(){

    if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'reactive' ) );
    }

    include_once 'admin-template/reactive-system-status.php';
  }

}
