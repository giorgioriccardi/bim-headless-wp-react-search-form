<?php

namespace Reactive\App;
/**
*
*/
class GridPostData
{
  public static function get_post_data( $posts = [] ){

		foreach ($posts as &$post) {
			if($post['post_type'] === 'product' && isset($post['product_type']) && $post['product_type'] !== 'simple') {
				$_product = wc_get_product( $post['ID'] );
				$post['price_html'] = $_product->get_price_html();
			}
		}
    return $posts;
  }
}
