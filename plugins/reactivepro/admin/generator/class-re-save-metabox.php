<?php

/**
 * Generate MetaBox Saver
 */

namespace Reactive\Admin;

class Redq_Generate_Metabox_Saver{
  public function __construct( $args ) {
      $this->generate_metabox_saver( $args );
  }
  public function generate_metabox_saver( $args ){
        foreach ($args as $meta_args) {
            $post_type = get_post_type($meta_args['post_id']);

            if( $post_type === $meta_args['post_type'] ){
                foreach( $meta_args['meta_fields'] as $key => $meta_field ) {
                    if( isset( $_POST[$meta_field]) ) {
                        $meta_value = $_POST[$meta_field];
                        update_post_meta( $meta_args['post_id'], $meta_field, $meta_value );
                        if($meta_field == '_reactive_geobox_preview'){
                          $location_object = json_decode( stripslashes_deep($meta_value), true );
                          if(!empty($location_object)){
                            $location_data = $location_object['location'];
                          }
                          if(isset($location_data)){
                            $this->reactive_lat_long($meta_args['post_id'], $location_data);
                          }
                        }
                        if( isset( $meta_args['has_individual'] ) && $meta_args['has_individual']) {
                            if( $meta_value ) {
                                $meta_object_data = json_decode( stripslashes_deep($meta_value), true );
                                foreach ($meta_object_data as $key => $value) {
                                  if ($key === 'location') {
                                    foreach ($value as $chlildMetaKey => $childMetaValue) {
                                      update_post_meta($meta_args['post_id'], $chlildMetaKey, $childMetaValue);
                                    }
                                  } else {
                                    update_post_meta($meta_args['post_id'], $key, $value);
                                  }
                                }
                            }
                        }

                    }
                }
            }
        }
  }

  function reactive_lat_long($post_id, $data){
    global $wpdb;
    $check_link = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}re_lat_lng WHERE id = '" . $post_id . "'");
    if(isset($data['zipcode'])){
    	$zipcode = $data['zipcode'];
    }
    if(isset($data['zip_code'])){
    	$zipcode = $data['zip_code'];
    }
    if ($check_link != null) {
      if ( isset($data['lat']) && $data['lng'] )
        $wpdb->update( $wpdb->prefix.'re_lat_lng', array(
          'lat' => $data['lat'],
          'lng' => $data['lng'],
          'state' => $data['state_long'],
          'city' => $data['city'],
          'country' => $data['country_long'],
          'country_short_name' => $data['country_short'],
          'state_short_name' => $data['country_long'],
          'zipcode' => $zipcode,
          'formatted_address' => $data['formattedAddress'],
        ), array( 'id' => $post_id ),
        array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s') );
    }else{
      if ( isset($data['lat']) && $data['lng'] )
        $wpdb->insert( $wpdb->prefix.'re_lat_lng',
        array(
            'id' => $post_id,
            'lat' => $data['lat'],
            'lng' => $data['lng'],
            'state' => $data['state_long'],
            'city' => $data['city'],
            'country' => $data['country_long'],
            'country_short_name' => $data['country_short'],
            'state_short_name' => $data['country_long'],
            'zipcode' => $zipcode,
            'formatted_address' => $data['formattedAddress'],
        ),
        array( '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ));
    }
    }
}
