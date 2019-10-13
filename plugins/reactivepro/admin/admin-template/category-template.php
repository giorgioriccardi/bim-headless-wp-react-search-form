<?php
global $post;
$category_template_data = get_post_meta($post->ID, 'reactive_grid_template', true);
$category_template_data !=='' ?  $category_template_data : '';
?>
<textarea data-language="javascript" data-lineNumbers="true" id="reactive_grid_template" name="reactive_grid_template" rows="8" cols="80">
  <?php echo esc_html( $category_template_data ); ?>
</textarea>