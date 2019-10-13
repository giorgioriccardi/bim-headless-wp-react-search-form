<?php

add_action('reactive_preview_popup_template', 'reactive_preview_popup_template_plugin');

function reactive_preview_popup_template_plugin() {

$args = array(
	'post_type'			=> 're_preview_popup',
	'post_per_page'	=>	-1,
	'numberposts'		=>	-1,
);
$all_posts = get_posts($args);
foreach ($all_posts as $post) {
	$postId = $post->ID;
	//$postName = $post->post_name;
	$postName = 'preview_popup_' . str_replace("-", "", $post->post_name);
	$previewPopupTemplate = get_post_meta($postId, 'reactive_grid_template');
	?>
	<script type="text/html" id="tmpl-<?php echo $postName ?>-template">
		<?php echo $previewPopupTemplate[0] ?>
	</script>
	<?php
}

?>

<?php }
