<?php

/* Theme Widget sidebars. */
require get_template_directory() . '/inc/widgets/widget-sidebars.php';

/* Theme Widgets*/
require get_template_directory() . '/inc/widgets/tab-posts.php';
require get_template_directory() . '/inc/widgets/author-info.php';
require get_template_directory() . '/inc/widgets/social-menu.php';

/* Register site widgets */
if ( ! function_exists( 'minimal_lite_widgets' ) ) :
    /**
     * Load widgets.
     *
     * @since 1.0
     */
    function minimal_lite_widgets() {
        register_widget( 'Minimal_Lite_Tab_Posts' );
        register_widget( 'Minimal_Lite_Social_Menu' );
        //register_widget( 'Minimal_Lite_Video_Slider' );
        register_widget( 'Minimal_Lite_Author_Info' );
    }
endif;
add_action( 'widgets_init', 'minimal_lite_widgets' );

/* Outputs necessary javascript template to be used in widgets */
if ( ! function_exists( 'minimal_lite_print_widgets_template' ) ) :
    /**
     * Prints Javascript template.
     *
     * @since 1.0
     */
    function minimal_lite_print_widgets_template() {
        ?>
        <!--For Youtube Video Slider Widget -->
        <script type="text/html" id="tmpl-me-youtube-urls">
            <div class="field-group">
                <input class="me-widefat" type="text" name="{{data.name}}" value="" />
                <span class="me-remove-youtube-url">
                    <span class="dashicons dashicons-no-alt"></span>
                </span>
            </div>
        </script>
        <?php
    }
endif;
//add_action( 'admin_footer-widgets.php', 'minimal_lite_print_widgets_template');