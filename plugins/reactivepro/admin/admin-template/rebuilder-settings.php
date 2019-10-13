<div id="redq_reactive_rebuilder_settings"></div>

<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $settings_array = new RedQ_Provider();
  $settings_fields = $settings_array->rebuilder_settings_array();
  $conditional_logic = $settings_array->rebuilder_conditional_logic();
  $rebuilder_settings = get_post_meta( $post->ID, '_reactive_rebuilder_settings', true );
  wp_localize_script( 're_builder', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'REBUILDER_SETTINGS' => $rebuilder_settings,
      'fields' => apply_filters('reactive_rebuilder_settings_fileds', $settings_fields),
      'conditions' => $conditional_logic,
  ) ));
?>

<input type="hidden" id="_reactive_rebuilder_settings" name="_reactive_rebuilder_settings" value="<?php echo esc_attr(isset($rebuilder_settings) ? $rebuilder_settings : null) ?>">
