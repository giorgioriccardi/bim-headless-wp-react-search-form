<?php
/**
*
*/

namespace Reactive\App;

class Reuse {

  public static function load($localPath) {
    $reuseform_scripts = json_decode(file_get_contents( RE_DIR . "/resource/reuse.json"),true);
    if (isset($reuseform_scripts['vendor'])) {
      wp_register_script( 'reuse_vendor', $localPath. $reuseform_scripts['vendor']['js'], array(), $ver = false, true);
      wp_enqueue_script( 'reuse_vendor' );
    }
    if (isset($reuseform_scripts['reuse'])) {
      wp_register_script( 'reusejs', $localPath. $reuseform_scripts['reuse']['js'], array('jquery', 'underscore'), $ver = false, true);
      wp_enqueue_script( 'reusejs' );
    }
    wp_localize_script( 'reusejs', 'REUSE_ADMIN', array(
      'LANG'          => Reuse::reuse_form_language(),
      'ERROR_MESSAGE'	=> Reuse::reuse_form_error_messages(),
      '_WEBPACK_PUBLIC_PATH_' => $localPath,
      'base_url' => apply_filters( 'reuse_image_base_url',  RE_IMG ),
    ));
  }

  public static function reuse_form_language() {
    /**
    * Localize language files for reuse form rendering
    */
    $lang = array(
      'BUNDLE_COMPONENT' => __('Bundle Component', 'scholarwp'),
      'PICK_COLOR' => __('Pick Color','scholarwp'),
      'NO_RESULT_FOUND' => __('No result found', 'scholarwp'),
      'SEARCH' => __('search','scholarwp'),
      'OPEN_ON_SELECTED_HOURS' => __('Open on selected hours', 'scholarwp'),
      'ALWAYS_OPEN' => __('Always open', 'scholarwp'),
      'NO_HOURS_AVAILABLE' => __('No hours available', 'scholarwp'),
      'PERMANENTLY_CLOSE' => __('Permanently closed', 'scholarwp'),
      'MONDAY' => __('Monday', 'scholarwp'),
      'TUESDAY' => __('Tuesday', 'scholarwp'),
      'WEDNESDAY' => __('Wednesday', 'scholarwp'),
      'THURSDAY' => __('Thursday', 'scholarwp'),
      'FRIDAY' => __('Friday', 'scholarwp'),
      'SATURDAY' => __('Saturday', 'scholarwp'),
      'SUNDAY' => __('Sunday', 'scholarwp'),
      'WRONG_PASS' => __('Wrong Password', 'scholarwp'),
      'PASS_MATCH' => __('Password Matched', 'scholarwp'),
      'CONFIRM_PASS' => __('Confirm Password', 'scholarwp'),
      'CURRENTLY_WORK' => __('I currently work here', 'scholarwp'),
    );

    return $lang;
  }

  public static function reuse_form_error_messages() {
    /**
    * Localize Error Message files for js rendering
    */
    $error_message_list = array(
      'notNull'   => 'The field should not be empty',
      'email'     => 'The field should be email',
      'isNumeric' => 'The field should be numeric',
      'isURL'     => 'The field should be Url'
    );
    return $error_message_list;
  }

}
