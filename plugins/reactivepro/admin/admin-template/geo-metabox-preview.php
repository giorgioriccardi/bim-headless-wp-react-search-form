<div id="redq_reactive_geobox_preview"></div>

<?php
/**
 * Localize the updated data from database
 */
  use Reactive\Admin\RedQ_Provider;
  $preview_array = new RedQ_Provider();
  $preview_fields = $preview_array->geobox_preview_array();
  $geobox_preview = get_post_meta($post->ID, '_reactive_geobox_preview', true );
  wp_localize_script( 're_geoboxPreview', 'REACTIVE_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'GEOBOX_PREVIEW' => $geobox_preview,
      'fields' => apply_filters('reactive_geobox_preview_fileds', $preview_fields),
  ) ));
?>

<input type="hidden" id="_reactive_geobox_preview" name="_reactive_geobox_preview" value="<?php echo esc_attr(isset($geobox_preview) ? $geobox_preview : null) ?>">
