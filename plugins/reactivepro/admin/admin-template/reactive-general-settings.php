
  <div class="re_geobox_settings_" id="redq_reactive_general_settings"></div>


<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $settings_array = new RedQ_Provider();
  $grid_settings_array = [];
  $args = array(
    'post_type' => 'reactive_builder',
    'posts_per_page' => -1
  );

  $grid_settings = get_posts( $args );

  foreach ($grid_settings as $key => $single_grid_setting) {
    $grid_settings_array[$single_grid_setting->ID] = get_post_meta($single_grid_setting->ID, 'reactivedata', true);
  }

  $settings_fields = $settings_array->general_settings_array();
  $general_settings = stripslashes_deep(get_option( '_reactive_general_settings', true ));
  wp_localize_script( 're_generalSettings', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'GENERAL_SETTINGS' => $general_settings,
      'GRID_SETTINGS'    => $grid_settings_array,
      'fields' => apply_filters('reactive_general_settings_fileds', $settings_fields),
  ) ));
?>

<input type="hidden" id="_reactive_general_settings" name="_reactive_general_settings" value="<?php echo esc_attr(isset($general_settings) ? $general_settings : null) ?>">
