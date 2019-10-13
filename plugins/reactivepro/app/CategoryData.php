<?php

namespace Reactive\App;
/**
*
*/
class CategoryData
{
  public static function get_category_data( $categories = [] ){

    foreach ($categories as &$category) {
    	$id = $category['ID'];
    	$categoryObject = get_term($id);
    	$category['link'] = get_term_link($categoryObject);
      if(isset($category['term_meta']['thumbnail_id']) && !empty($category['term_meta']['thumbnail_id'])) {
        $thumbnail_id = $category['term_meta']['thumbnail_id'];
        $category['term_meta']['image'] = wp_get_attachment_url( $thumbnail_id );
      }
    }
    return $categories;
  }

}
