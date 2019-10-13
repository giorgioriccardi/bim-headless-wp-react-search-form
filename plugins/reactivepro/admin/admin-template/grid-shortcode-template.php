<div id="redq_reactive_grid_shortcode_settings"></div>

<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $settings_array = new RedQ_Provider();
  $settings_fields = $settings_array->_reactive_grid_builder_settings_array();
  $grid_builder = get_post_meta( $post->ID, '_reactive_grid_builder_settings', true );
  wp_localize_script( 're_gridBuilder', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'GRID_BUILDER_SETTINGS' => $grid_builder,
      'fields' => apply_filters('reactive_grid_builder_fileds', $settings_fields),
  ) ));
?>

<input type="hidden" id="_reactive_grid_builder_settings" name="_reactive_grid_builder_settings" value="<?php echo esc_attr(isset($grid_builder) ? $grid_builder : null) ?>">
