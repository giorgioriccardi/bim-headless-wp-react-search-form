<?php
global $wpdb;
?>

<style>
.adminContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 100px;
}
</style>

<div class="adminContainer">
  <h1>Welcome to Reactive Pro</h1>
  <span>v3</span>
</div>

<div class="reactive-trick reactive-wrap">
	<table class="widefat" cellspacing="0">
		<thead>
			<tr>
				<th colspan="3" data-export-label="System Status"><h4 style="margin-top: 0">System Status</h4></th>
			</tr>
		</thead>
		<tbody>
			<tr><td>WP Version: </td><td><?php bloginfo('version'); ?></td></tr>
			<tr><td>WP Memory Limit: </td><td><?php echo esc_attr(WP_MEMORY_LIMIT); ?>
				<code><?php esc_html_e( 'The Recommened Minimum WP Memory Limit is 256M','reactive' ); ?>
				</code>
			</td></tr>
			<tr><td>WP Multisite: </td><td><?php if(is_multisite()) echo 'Yes'; else echo 'No' ?> </td></tr>
			<tr class="real-memory"><td>Server Memory Limit:</td>
				<td>
					<span class="calculating"><?php esc_html_e( 'Calculating…', 'reactive' ); ?></span>
					<mark class="yes" style="display: none;">%d% MB</mark>
					<code><?php esc_html_e( 'The Recommened Minimum Server Memory Limit is 256M','reactive' ); ?>
					</code>
				</td>
			</tr>
			<tr><td>PHP Version: </td><td><?php echo esc_attr(phpversion()); ?>
				<code><?php esc_html_e( 'The Recommened Minimum PHP version is 5.6.0','reactive' ); ?>
				</code>
			</td></tr>
			<tr><td>PHP Post Maximum Size: </td><td><?php echo esc_attr(ini_get( 'post_max_size' )); ?> </td></tr>
			<tr><td>PHP Maximum Execution Time: </td><td><?php echo esc_attr(ini_get( 'max_execution_time' )); ?> </td></tr>
			<tr>
				<td>PHP Maximum Input Vars: </td>
				<td><?php echo esc_attr(ini_get('max_input_vars')); ?>
					<code><?php esc_html_e( 'The Recommened Minimum Input Vars is 3000','reactive' ); ?>
					</code>
				</td>
			</tr>
			<tr><td>Maximum Upload Size: </td><td><?php echo esc_attr(size_format(wp_max_upload_size())); ?> </td></tr>
			<tr>
				<td>Mysql Version: </td>
				<td><?php echo esc_attr($wpdb->db_version()); ?>
					<code><?php esc_html_e( 'The Recommened Minimum Mysql version is 5.6.0 or greater','reactive' ); ?>
					</code>
				</td></tr>
		</tbody>
	</table>
</div>





<script type="text/javascript">

	jQuery( document ).ready( function ( $ ) {

		$.ajax({
			type : 'post',
			url: '<?php echo RE_URL; ?>/admin/admin-template/reactive-test-memory.php',
			success: function(response) {
				var get_memory_array = String(response).split('\n'),
					get_memory;
				$(get_memory_array).each(function(index, el) {
					var temp_memory = el.replace( /^\D+/g, '');
					if ('%'+temp_memory == el) get_memory = temp_memory;
				});
				var	memory_string;
				if (get_memory < 256) {
					memory_string = $('.real-memory .error');
				} else {
					memory_string = $('.real-memory .yes');
				}
				memory_string.text(memory_string.text().replace("%d%", get_memory));
				$('.calculating').hide();
				memory_string.show();
			},
			error: function(response) {
				var get_memory_array = String(response.responseText).split('\n'),
					get_memory;
				$(get_memory_array).each(function(index, el) {
					var temp_memory = el.replace( /^\D+/g, '');
					if ('%'+temp_memory == el) get_memory = temp_memory;
				});
				var	memory_string;
				if (get_memory < 96) {
					memory_string = $('.real-memory .error');
				} else {
					memory_string = $('.real-memory .yes');
				}
				memory_string.text(memory_string.text().replace("%d%", get_memory));
				$('.calculating').hide();
				memory_string.show();
			}
		});

	});

</script>
