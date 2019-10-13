<?php
/**
 * Generate MetaBox
 */

namespace Reactive\Admin;

class Admin_Column_Builder {
	public function __construct() {
        add_filter( 'manage_reactive_builder_posts_columns', array( $this, 're_columns_head' ), 10, 1 );
        add_action( 'manage_reactive_builder_posts_custom_column', array( $this, 're_columns_reactive_builder_content' ), 10, 2 );
        add_filter( 'manage_re_grid_shortcode_posts_columns', array( $this, 're_columns_head' ), 10, 1 );
        add_action( 'manage_re_grid_shortcode_posts_custom_column', array( $this, 're_columns_grid_shortcode_content' ), 10, 2 );

	}

    // CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    function re_columns_head( $defaults ) {
        unset($defaults['date']);
        $defaults['shortcode'] = esc_html__( 'Shortcode', 'reactive' );
        $defaults['date'] = esc_html__( 'Date', 'reactive' );

        return $defaults;
    }
    function re_columns_reactive_builder_content( $column_name, $post_ID ) {
        if ($column_name == 'shortcode') { ?>
            <pre class="scwp-snippet wpt-scwp-snippet"><div class="scwp-clippy-icon" data-clipboard-snippet=""><img class="clippy" width="13" src="<?php print RE_IMG ?>clippy.svg" alt="Copy to clipboard"></div><code class="js hljs javascript">[reactive key="<?php echo $post_ID ?>"]</code></pre>
        <?php }
    }
    // // CREATE TWO FUNCTIONS TO HANDLE THE COLUMN
    // function re_columns_grid_shortcode_head( $defaults ) {
    //     unset($defaults['date']);
    //     $defaults['shortcode'] = esc_html__( 'Shortcode', 'reactive' );
    //     $defaults['date'] = esc_html__( 'Date', 'reactive' );
    //
    //     return $defaults;
    // }
    function re_columns_grid_shortcode_content( $column_name, $post_ID ) {
        if ($column_name == 'shortcode') { ?>
            <pre class="scwp-snippet wpt-scwp-snippet"><div class="scwp-clippy-icon" data-clipboard-snippet=""><img class="clippy" width="13" src="<?php print RE_IMG ?>clippy.svg" alt="Copy to clipboard"></div><code class="js hljs javascript">[reactive_grid key="<?php echo $post_ID ?>"]</code></pre>
        <?php }
    }

}
