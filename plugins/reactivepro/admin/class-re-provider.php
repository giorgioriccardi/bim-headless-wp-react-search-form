<?php
/**
 *
 */
namespace Reactive\Admin;

use Reactive\Admin\Re_Admin_Scripts;
use Reactive\App\Graph;
class RedQ_Provider {
  public function __construct() {

  }

  public function geobox_preview_array(){
    $geobox_preview_array = array(
      array(
        'id'      => 'location',
        'type'    => 'geobox',
        'label'   => 'Location',
      ),
    );
    return $geobox_preview_array;
  }

  public function geobox_settings_array(){
    $provider = new Re_Admin_Scripts();
    $post_types = $provider->redq_get_all_posts();
    $geobox_settings_array = array(
      array(
        'id'        => 'geobox_post_type_select',
        'type'      => 'select',
        'label'     => 'Post Types Select',
        'param'     => 'geobox_post_type_select_param',
        'multiple'  => 'true',
        'options'   => $post_types,
      ),
      array(
        "id"               => "save_geobox_settings",
        "label"            => "Save",
        "type"             => "compoundbutton",
        "parentId"         => [],
        "getallData"       => "true",
        "getFormData"      => "true",
        "fullWidthControl" => "reuseFluidButton",
        "className"        => "reuseButton"
      ),
    );
    return $geobox_settings_array;
  }
  public function general_settings_array(){
    $provider = new Re_Admin_Scripts();
    $pages = $provider->redq_get_all_pages();
    $general_settings_array = array(
      array(
        'id'        => 'reactive_search_page_url',
        'type'      => 'select',
        'label'     => 'Reactive Search Page Url',
        'param'     => 'reactive_search_page_url',
        'options'    => $pages
      ),
      array(
        "id"               => "search_override",
        "label"            => "Enable Default Search Override",
        "type"             => "switch",
        "value"            => "false"
      ),
      array(
        "id"               => "sync_builder_data",
        "label"            => "Sync Builder Data",
        "type"             => "compoundbutton",
        "getallData"       => "true",
        "getFormData"      => "true",
        "fullWidthControl" => "reuseFluidButton",
        "className"        => "reuseButton"
      ),
      array(
        "id"               => "save_general_settings",
        "label"            => "Save",
        "type"             => "compoundbutton",
        "parentId"         => [],
        "getallData"       => "true",
        "getFormData"      => "true",
        "fullWidthControl" => "reuseFluidButton",
        "className"        => "reuseButton"
      ),
    );
    return $general_settings_array;
  }
  public function meta_restrictions_array(){
    $provider = new Re_Admin_Scripts();
    $meta_keys = $provider->redq_get_all_meta_keys();
    $meta_restrictions_array = array(
      array(
        'id'        => 'restrict_metas',
        'type'      => 'checkbox',
        'label'     => 'Select Restricted Metas',
        'param'     => 'restrict_metas_param',
        'multiple'  => 'true',
        'options'   => $meta_keys,
      ),
      array(
        "id"               => "save_restrict_metas",
        "label"            => "Save",
        "type"             => "compoundbutton",
        "parentId"         => [],
        "getallData"       => "true",
        "getFormData"      => "true",
        "fullWidthControl" => "reuseFluidButton",
        "className"        => "reuseButton"
      ),
    );
    return $meta_restrictions_array;
  }

  public function rebuilder_settings_array(){
    $provider = new Re_Admin_Scripts();
    $graph = new Graph();
    $post_types = $provider->redq_get_all_posts();
    $custom_supported_post_types = array(
      'user' => 'User',
      'review' => 'Reviews',
      'post_type' => 'Post Type',
    );
    $buddy_press_post_types = array(
      'bp_group' => 'BuddyPress Group',
      // 'bp_activity' => 'BuddyPress Activity'
    );
    if(is_plugin_active( 'buddypress/bp-loader.php' )){
      $custom_supported_post_types = array_merge($custom_supported_post_types, $buddy_press_post_types);
    }
    $taxonomies = $provider->redq_get_all_taxonomies();
    $meta_keys = $provider->redq_get_all_meta_keys();
    $pages = $provider->redq_get_all_pages();
    $term_meta_keys = $graph->get_all_terms_meta_key();
    $sorting_atributes = array_merge(
      [
        'post_title' => 'Post Title',
        'post_date' => 'Post Date',
        'menu_order' => 'Menu Order',
        'comment_count' => 'Post Comment Count',
        'user_nicename' => 'User Nicename',
        'user_registered' => 'User Registered Date',
        'user_email' => 'User Email',
        'display_name' => 'User Display Name',
        'user_login' => 'Username',
        'comment_content' => 'Comment Content',
        'comment_date' => 'Comment Date',
        'comment_author' => 'Comment Author',
        'name' => 'BuddyPress Group Name',
        'description' => 'BuddyPress Group Description',
        'date_created' => 'BuddyPress Group Creation Date',
        'date_recorded' => 'BuddyPress Activity Recorded Date',
       ],
    $meta_keys);

    $rebuilder_settings_array = array(
      array(
        'id'        => 'rebuilder_search_type',
        'type'      => 'select',
        'label'     => 'Select Search Type',
        'param'     => 'rebuilder_search_type_param',
        'multiple'  => 'false',
        'options'   => $custom_supported_post_types,
        'value' => 'post_type'
      ),
      array(
        'id'        => 'rebuilder_post_type_select',
        'type'      => 'select',
        'label'     => 'Post Types Select',
        'param'     => 'rebuilder_post_type_select_param',
        'multiple'  => 'true',
        'options'   => $post_types,
      ),
      array(
        'id'        => 'rebuilder_taxonomy_select',
        'type'      => 'select',
        'label'     => 'Taxonomies Select',
        'param'     => 'rebuilder_taxonomy_select_param',
        'multiple'  => 'true',
        'options'   => $taxonomies,
      ),
      array(
        'id'        => 'rebuilder_meta_keys_select',
        'type'      => 'select',
        'label'     => 'Meta Keys Select',
        'param'     => 'rebuilder_meta_keys_select_param',
        'multiple'  => 'true',
        'options'   => $meta_keys,
      ),
      array(
        'id'        => 'rebuilder_sorting_attribute_select',
        'type'      => 'select',
        'label'     => 'Sorting Attribute Select',
        'param'     => 'rebuilder_sorting_attribute_select',
        'multiple'  => 'true',
        'options'   => $sorting_atributes,
      ),
      array(
        'id'        => 'rebuilder_term_meta_select',
        'type'      => 'select',
        'label'     => 'Term Meta Keys Select',
        'param'     => 'rebuilder_term_meta_select_param',
        'multiple'  => 'true',
        'options'   => $term_meta_keys,
      ),
      array(
        'id'        => 'rebuilder_redirect_page_select',
        'type'      => 'select',
        'label'     => 'Redirect Page Select',
        'param'     => 'rebuilder_redirect_page_select_param',
        'multiple'  => 'true',
        'options'   => $pages,
      ),

      array(
        'id'        => 'serialized_meta_keys',
        'type'      => 'select',
        'label'     => 'Select Serialized Meta Fields',
        'param'     => 'serialized_meta_keys_param',
        'multiple'  => 'true',
        'options'   => $meta_keys,
      ),
      array(
        'id'        => 'user_data',
        'type'      => 'switch',
        'label'     => 'Fetch User Data',
        'param'     => 'user_data_param',
        'value'   => 'false',
      ),
      array(
        'id'        => 'skip_post_content',
        'type'      => 'switch',
        'label'     => 'Skip Post Content Data',
        'param'     => 'skip_post_content',
        'value'   => 'false',
      ),
      array(
        'id' => 'search_restricted_terms',
        'type' => 'select',
        'label' => 'Select Restricted Terms',
        'multiple' => 'true', // optional
        'options' => re_get_all_term_taxonomies()
      )
    );
    return $rebuilder_settings_array;
  }
  public function rebuilder_conditional_logic() {
    return $allLogicBlock = [
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'user',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'hide',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'review',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'show',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'bp_group',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'hide',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'bp_activity',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'hide',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'hide',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'undefined',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'show',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'show',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'show',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  	[
  		'name' => 'condition101',
  		'id' => 322283156285,
  		'logicBlock' => [
  			[
  				'id' => 13737583162312,
  				'key' => 'field',
  				'value' => [
  					'fieldID' => 'rebuilder_search_type',
  					'secondOperand' => [
  						'type' => 'value',
  						'value' => 'post_type',
  					],
  					'operator' => 'equal_to',
  				],
  				'childresult' => false,
  			],
  		],
  		'effectField' => [
  			[
  				'action' => 'show',
  				'id' => 148733833181529,
  				'fieldID' => 'rebuilder_post_type_select',
  			],
  			[
  				'action' => 'show',
  				'id' => 14873383181529,
  				'fieldID' => 'rebuilder_taxonomy_select',
  			],
  			[
  				'action' => 'show',
  				'id' => 148787613315,
  				'fieldID' => 'rebuilder_term_meta_select',
  			],
  		],
  	],
  ];
}

  public function _reactive_grid_builder_settings_array() {
    $provider = new Re_Admin_Scripts();
    $post_types = $provider->redq_get_all_posts();
    $grid_builder_settings_array = array(
      array(
        'id'        => 'rebuilder_post_type_select',
        'type'      => 'select',
        'label'     => 'Post Types Select',
        'param'     => 'rebuilder_post_type_select_param',
        'multiple'  => 'true',
        'options'   => $post_types,
      ),
    );

    return $grid_builder_settings_array;
  }

  /**
  *
  * @param string [comma seperated]
  *
  */
  public function get_all_taxonomies( $post_types='post' )
  {
   $all_post_types = explode(",",$post_types);
   $taxonomies = array();
   foreach ($all_post_types as $type ) {
     $taxonomies = array_merge( $taxonomies, get_object_taxonomies( $type) ) ;
   }
   return $taxonomies;
  }

  public function get_post_image($post_id)
  {
    if (has_post_thumbnail( $post_id ) ){
      $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'full' );
      return $image[0];
    }
  }

  public function get_post_image_alt_text($post_id)
  {
    if (has_post_thumbnail( $post_id ) ){
      $image_id = get_post_thumbnail_id( $post_id );
      $alt_text = get_post_meta($image_id , '_wp_attachment_image_alt', true);
      return $alt_text;
    }
  }

  public function get_post_gallery($content_post)
  {
    $content = $content_post->post_content;
    $gallery_ids = array();
    $temp = array();
    if (strpos($content, 'gallery ids') !== false) {
      if(preg_match('/"([^"]+)"/', $content, $attachment_ids)){
        $gallery_ids = $attachment_ids[1];
      }
      $gallery_ids = explode(',', $gallery_ids);
    }
    foreach( $gallery_ids as $gallery_id ) {
      $image_link = wp_get_attachment_url( $gallery_id );
      $temp[] = $image_link;
    }
    return $temp;
  }

  public function get_post_link($post_id)
  {
    return get_the_permalink( $post_id );
  }


}
