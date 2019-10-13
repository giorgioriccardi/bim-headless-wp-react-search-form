<div class="reactive_meta_restriction" id="redq_reactive_meta_restrictions"></div>

<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $settings_array = new RedQ_Provider();
  $settings_fields = $settings_array->meta_restrictions_array();
  $meta_restrictions = stripslashes_deep(get_option( '_reactive_meta_restrictions', true ));
  wp_localize_script( 're_metaRestrictions', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'META_RESTRICTIONS' => $meta_restrictions,
      'fields' => apply_filters('reactive_meta_restrictions_fileds', $settings_fields),
  ) ));
?>

<input type="hidden" id="_reactive_meta_restrictions" name="_reactive_meta_restrictions" value="<?php echo esc_attr(isset($meta_restrictions) ? $meta_restrictions : null) ?>">
