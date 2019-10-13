<?php
/**
 *
 */

class Reuse {

	public static function load($localPath) {
    // wp_enqueue_script('media-upload');
    // wp_enqueue_script('thickbox');
    // wp_enqueue_style('thickbox');
        $reuseform_scripts = json_decode(file_get_contents( REUSE_FORM_DIR . "/resource/reuse.json"),true);
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
      'base_url' => apply_filters( 'reuse_image_base_url',  REUSE_FORM_IMG ),
    ));

    wp_localize_script( 'reusejs', 'RE_ICON', array('icon_provider' => apply_filters( 'reuse_icon_picker',  array() ), )); // For reuse form
	}

	public static function reuse_form_language() {
		/**
		 * Localize language files for reuse form rendering
		 */
		$lang = array(
      'BUNDLE_COMPONENT' => __('Bundle Component', 'resue-form'),
      'PICK_COLOR' => __('Pick Color','resue-form'),
      'NO_RESULT_FOUND' => __('No result found', 'resue-form'),
      'SEARCH' => __('search','resue-form'),
      'OPEN_ON_SELECTED_HOURS' => __('Open on selected hours', 'resue-form'),
      'ALWAYS_OPEN' => __('Always open', 'resue-form'),
      'NO_HOURS_AVAILABLE' => __('No hours available', 'resue-form'),
      'PERMANENTLY_CLOSE' => __('Permanently closed', 'resue-form'),
      'MONDAY' => __('Monday', 'resue-form'),
      'TUESDAY' => __('Tuesday', 'resue-form'),
      'WEDNESDAY' => __('Wednesday', 'resue-form'),
      'THURSDAY' => __('Thursday', 'resue-form'),
      'FRIDAY' => __('Friday', 'resue-form'),
      'SATURDAY' => __('Saturday', 'resue-form'),
      'SUNDAY' => __('Sunday', 'resue-form'),
      'WRONG_PASS' => __('Wrong Password', 'resue-form'),
      'PASS_MATCH' => __('Password Matched', 'resue-form'),
      'CONFIRM_PASS' => __('Confirm Password', 'resue-form'),
      'CURRENTLY_WORK' => __('I currently work here', 'resue-form'),
      'NULL' => __('Null', 'resue-form'),
      'DATA_RECEIVED' => __('Data received', 'resue-form'),
      'SELECT_BOX_CLEAR_BUTTON' => __('Clear', 'resue-form'),
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
