<?php

function getCredentials($h, $w, $x, $y) {
	return [
		'h' => $h,
		'w' => $w,
		'x' => $x,
		'y' => $y
	];
}
// function gridLeftSearchRight () {
//  $data = [[
// 	'boxType' => 'bar',
// 	'size' => [
// 		'lg' => getCredentials(2, "72", "0", "0" ),
// 		'md' => getCredentials(2, "72", "0", "0" ),
// 		'sm' => getCredentials(2, "96", "0", "0" ),
// 		'xs' => getCredentials(2, "96", "0", "0" ),
// 		'xxs' => getCredentials(2, "96", "0", "0" ),
// 	],
// 	'barAttr' => [[
// 		'type' => 'label',
// 		'size' => [
// 			'lg' => getCredentials(2, "32", "0", "0" ),
// 			'md' => getCredentials(2, "32", "0", "0" ),
// 			'sm' => getCredentials(2, "32", "0", "0" ),
// 			'xs' => getCredentials(2, "32", "0", "0" ),
// 			'xxs' => getCredentials(2, "32", "0", "0" ),
// 		]
// 	], [
// 		'type' => 'sort',
// 		'size' => [
// 			'lg' => getCredentials(2, "27", "58", "0" ),
// 			'md' => getCredentials(2, "27", "58", "0" ),
// 			'sm' => getCredentials(2, "27", "58", "0" ),
// 			'xs' => getCredentials(2, "27", "58", "0" ),
// 			'xxs' => getCredentials(2, "27", "58", "0" ),
// 		]
// 	], [
// 		'type' => 'selectGroup',
// 		'size' => [
// 			'lg' => getCredentials(2, "8", "88", "0" ),
// 			'md' => getCredentials(2, "8", "88", "0" ),
// 			'sm' => getCredentials(2, "8", "88", "0" ),
// 			'xs' => getCredentials(2, "8", "88", "0" ),
// 			'xxs' => getCredentials(2, "8", "88", "0" ),
// 		]
// 	]]
// ], [
// 	'boxType' => 'grid',
// 	'size' => [
// 		'lg' => getCredentials(2, "72", "0", "2" ),
// 		'md' => getCredentials(2, "72", "0", "2" ),
// 		'sm' => getCredentials(2, "96", "0", "2" ),
// 		'xs' => getCredentials(2, "96", "0", "2" ),
// 		'xxs' => getCredentials(2, "96", "0", "2" ),
// 	]
// ], [
// 	'boxType' => 'searchBlock',
// 	'size' => [
// 		'lg' => getCredentials(2, "24", "73", "0" ),
// 		'md' => getCredentials(2, "24", "73", "0" ),
// 		'sm' => getCredentials(2, "96", "0", "4" ),
// 		'xs' => getCredentials(2, "96", "0", "4" ),
// 		'xxs' => getCredentials(2, "96", "0", "4" ),
// 	],
// 	'searchAttr' => [[
// 		'type' => 'text',
// 		'size' => [
// 			'lg' => getCredentials(2, "96", "0", "0" ),
// 			'md' => getCredentials(2, "96", "0", "0" ),
// 			'sm' => getCredentials(2, "96", "0", "0" ),
// 			'xs' => getCredentials(2, "96", "0", "0" ),
// 			'xxs' => getCredentials(2, "96", "0", "0" ),
// 		]
// 	], [
// 		'type' => 'checkbox',
// 		'size' => [
// 			'lg' => getCredentials(2, "96", "0", "2" ),
// 			'md' => getCredentials(2, "96", "0", "2" ),
// 			'sm' => getCredentials(2, "96", "0", "2" ),
// 			'xs' => getCredentials(2, "96", "0", "2" ),
// 			'xxs' => getCredentials(2, "96", "0", "2" ),
// 		]
// 	], [
// 		'type' => 'select',
// 		'size' => [
// 			'lg' => getCredentials(2, "96", "0", "4" ),
// 			'md' => getCredentials(2, "96", "0", "4" ),
// 			'sm' => getCredentials(2, "96", "0", "4" ),
// 			'xs' => getCredentials(2, "96", "0", "4" ),
// 			'xxs' => getCredentials(2, "96", "0", "4" ),
// 		]
// 	], [
// 		'type' => 'compoundbutton',
// 		'size' => [
// 			'lg' => getCredentials(2, "96", "0", "6" ),
// 			'md' => getCredentials(2, "96", "0", "6" ),
// 			'sm' => getCredentials(2, "96", "0", "6" ),
// 			'xs' => getCredentials(2, "96", "0", "6" ),
// 			'xxs' => getCredentials(2, "96", "0", "6" ),
// 		]
// 	]]
// ], [
// 	'boxType' => 'bar',
// 	'size' => [
// 		'lg' => getCredentials(2, "72", "0", "4" ),
// 		'md' => getCredentials(2, "72", "0", "4" ),
// 		'sm' => getCredentials(2, "96", "0", "6" ),
// 		'xs' => getCredentials(2, "96", "0", "6" ),
// 		'xxs' => getCredentials(2, "96", "0", "6" ),
// 	],
// 	'barAttr' => [[
// 		'type' => 'pagination',
// 		'size' => [
// 			'lg' => getCredentials(2, "18", "38", "0" ),
// 			'md' => getCredentials(2, "18", "38", "0" ),
// 			'sm' => getCredentials(2, "18", "38", "0" ),
// 			'xs' => getCredentials(2, "18", "38", "0" ),
// 			'xxs' => getCredentials(2, "18", "38", "0" ),
// 		]
// 	]]
// ]];
//
// $allTemplates = [
// 	'123' =>[
// 		'post_title' => 'gridLeftSearchRight',
// 		'readOnly' => 'false',
// 		'layouts_data' => $data
// 	]
// ];
//  return $allTemplates;
// }
//
 function gridLeftSearchRight() {
 		$args = array(
			'post_type' => 'reactive_layouts',
      'posts_per_page' => -1
		);
		$layouts = get_posts( $args );
		$processed_layouts_data = [];
    foreach ($layouts as $key => $layout) {
			$processed_layouts_data[$layout->ID]['post_title'] = $layout->post_title;
			$processed_layouts_data[$layout->ID]['readOnly'] = get_post_meta($layout->ID, 'readOnly', true);
			$all_Layouts = get_post_meta($layout->ID, 'reactive_grid_template', true);
			if (is_array($all_Layouts)) {
				if (isset($all_Layouts['layouts_data']) || isset($all_Layouts['global_settings']) || isset($all_Layouts['global_settings'])) {
					$processed_layouts_data[$layout->ID]['layouts_data'] = json_decode($all_Layouts['layouts_data']);
					$processed_layouts_data[$layout->ID]['global_settings'] = json_decode($all_Layouts['global_settings']);
					$processed_layouts_data[$layout->ID]['settings_data'] = json_decode($all_Layouts['settings_data']);
				}
			}
    }
		return $processed_layouts_data;
 }

	function re_get_all_term_taxonomies()
	{
		global $wpdb;
		$wpdb->get_results("SET SESSION group_concat_max_len = 999999999999999", 'ARRAY_A');
		$query = $wpdb->prepare("SELECT * FROM {$wpdb->terms} WHERE term_id <> %d", 0);
		$results = $wpdb->get_results($query, 'ARRAY_A');
		$new_array = array();

		foreach ($results as $result) {
			// $new_array = array_merge( array_combine( $term_slugs, $term_names ), $new_array );
			$new_array[$result['slug']] = $result['name'];
		}
		return $new_array;
	}

	function get_taxonomy_names($taxonomies){
		$taxonomy_names = array();
		foreach ($taxonomies as $key => $taxonomy) {
			if($taxonomy != ''){
				$taxonomy_object = get_taxonomy($taxonomy);
				if($taxonomy_object)
 			 	$taxonomy_names[$taxonomy] = $taxonomy_object->labels->singular_name;
			}
		}
		return $taxonomy_names;
	}
