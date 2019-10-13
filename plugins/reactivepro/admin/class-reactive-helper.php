<?php
/**
 *
 */
namespace Reactive\Admin;

class Reactive_Helper {
  public function __construct() {
    add_filter('search_link', array($this, 'search_override' ), 1 );
  }

  public function search_override($data) {
    $search_string = get_query_var('s');
    if (isset($search_string) && $search_string != '') {
      $general_settings = json_decode(stripslashes_deep(get_option( '_reactive_general_settings', true )), true);
      if(isset($general_settings['search_override']) && $general_settings['search_override'] == 'true'){
        if(isset($general_settings['reactive_search_page_url']) && $general_settings['reactive_search_page_url'] !='' ){
          $page_url = get_permalink( get_page_by_path($general_settings['reactive_search_page_url']));
          $search_page_url = $page_url . '?text='.$search_string;
          $string = '<script type="text/javascript">';
          $string .= 'window.location = "' . $search_page_url . '"';
          $string .= '</script>';
          echo $string;
        }
      }
    }
  }
}
