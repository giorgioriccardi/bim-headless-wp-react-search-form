<?php
global $post;
$map_info_template_data = get_post_meta($post->ID, 'reactive_grid_template', true);
$map_info_template_data !=='' ?  $map_info_template_data : '';
?>
<textarea data-language="javascript" data-lineNumbers="true" id="reactive_grid_template" name="reactive_grid_template" rows="8" cols="80">
  <?php echo esc_html( $map_info_template_data ); ?>
</textarea>