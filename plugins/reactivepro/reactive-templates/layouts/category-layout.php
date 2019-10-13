<?php

add_action('reactive_category_preview_template', 'reactive_category_preview_template_plugin');

function reactive_category_preview_template_plugin() {

$args = array(
	'post_type'			=> 'reactive_category',
	'post_per_page'	=>	-1,
	'numberposts'		=>	-1,
);
$all_posts = get_posts($args);
foreach ($all_posts as $post) {
	$postId = $post->ID;
	//$postName = $post->post_name;
	$postName = 'category_' . str_replace("-", "", $post->post_name);
	$categoryTemplate = get_post_meta($postId, 'reactive_grid_template');
	?>
	<script type="text/html" id="tmpl-<?php echo $postName ?>-template">
		<?php echo $categoryTemplate[0] ?>
	</script>
	<?php
}

?>

<?php }
