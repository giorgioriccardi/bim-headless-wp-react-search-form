<?php

namespace Reactive\Admin;

/**
* Re_Admin_Geobox
*/
class Re_Admin_Geobox {

  /**
   * Constructor.
   */
  function __construct() {
    if ( is_admin() ) {
      add_action( 'admin_init',     array( $this, 'init_metabox' ) );
    }
  }

  /**
   * Meta box initialization.
   */
  public function init_metabox() {
    add_action( 'add_meta_boxes', array( $this, 'add_metabox'  )        );
    add_action( 'save_post',      array( $this, 'save_metabox' ), 10, 2 );
  }

  /**
   * Adds the meta box.
   */
  public function add_metabox() {
    $reactive_settings = get_option('reactive_settings', true);
    
    $post_types = ( isset( $reactive_settings['geobox'] ) && !empty( $reactive_settings['geobox'] ) ) ? $reactive_settings['geobox'] : array('post');
    
    add_meta_box(
      'reactive-geobox',
      __( 'Geobox', 'reactive' ),
      array( $this, 'render_metabox' ),
      $post_types,
      'advanced',
      'default'
    );

  }

  /**
   * Renders the meta box.
   */
  public function render_metabox( $post ) {
    // Add nonce for security and authentication.
    wp_nonce_field( 'geobox_nonce_action', 'geobox_nonce' );

    include_once 'admin-template/reactive-geobox-html.php';
  }

  /**
   * Handles saving the meta box.
   *
   * @param int     $post_id Post ID.
   * @param WP_Post $post    Post object.
   * @return null
   */
  public function save_metabox( $post_id, $post ) {
    // Add nonce for security and authentication.
    $nonce_name   = isset( $_POST['geobox_nonce'] ) ? $_POST['geobox_nonce'] : '';
    $nonce_action = 'geobox_nonce_action';

    // Check if nonce is set.
    if ( ! isset( $nonce_name ) ) {
      return;
    }

    // Check if nonce is valid.
    if ( ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
      return;
    }

    // Check if user has permissions to save data.
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
    }

    // Check if not an autosave.
    if ( wp_is_post_autosave( $post_id ) ) {
      return;
    }

    // Check if not a revision.
    if ( wp_is_post_revision( $post_id ) ) {
      return;
    }

    if( isset($_POST['address']) && !empty( $_POST['address']) ) {
      update_post_meta($post_id, 'address', $_POST['address']);
    }

    if( isset($_POST['city']) && !empty( $_POST['city']) ) {
      update_post_meta($post_id, 'city', $_POST['city']);
    }

    if( isset($_POST['country']) && !empty( $_POST['country']) ) {
      update_post_meta($post_id, 'country', $_POST['country']);
    }

    if( isset($_POST['country_short_name']) && !empty( $_POST['country_short_name']) ) {
      update_post_meta($post_id, 'country_short_name', $_POST['country_short_name']);
    }

    if( isset($_POST['state']) && !empty( $_POST['state']) ) {
      update_post_meta($post_id, 'state', $_POST['state']);
    }

    if( isset($_POST['state_short_name']) && !empty( $_POST['state_short_name']) ) {
      update_post_meta($post_id, 'state_short_name', $_POST['state_short_name']);
    }

    if( isset($_POST['zipcode']) && !empty( $_POST['zipcode']) ) {
      update_post_meta($post_id, 'zipcode', $_POST['zipcode']);
    }

    if( isset($_POST['latitude']) && !empty( $_POST['latitude']) ) {
      update_post_meta($post_id, 'latitude', $_POST['latitude']);
    }

    if( isset($_POST['longitude']) && !empty( $_POST['longitude']) ) {
      update_post_meta($post_id, 'longitude', $_POST['longitude']);
    }
  }
}
