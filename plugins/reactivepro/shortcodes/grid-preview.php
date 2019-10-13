<?php
$grid_builder_post = get_post($key);
?>
<div id="reactive-grid-<?php echo $key; ?>" data-key="<?php echo $key; ?>"></div>
<?php
$grid_builder_data = json_decode(get_post_meta($key, '_reactive_grid_builder_settings', true));

if (isset($grid_builder_data->rebuilder_post_type_select)) {
  $post_types = explode(',', $grid_builder_data->rebuilder_post_type_select);
}

$alldata = array(
  $key => $post_types
);

wp_localize_script( 're_base', 'REACTIVE_GRID', $alldata);
