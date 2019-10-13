
  <div class="re_geobox_settings_" id="redq_reactive_geobox_settings"></div>


<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $settings_array = new RedQ_Provider();
  $settings_fields = $settings_array->geobox_settings_array();
  $geobox_settings = stripslashes_deep(get_option( '_reactive_geobox_settings', true ));
  wp_localize_script( 're_geoboxSettings', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'GEOBOX_SETTINGS' => $geobox_settings,
      'fields' => apply_filters('reactive_geobox_settings_fileds', $settings_fields),
  ) ));
?>

<input type="hidden" id="_reactive_geobox_settings" name="_reactive_geobox_settings" value="<?php echo esc_attr(isset($geobox_settings) ? $geobox_settings : null) ?>">
