<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Minimal_Lite
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
                <?php
                if ( have_posts() ) :

                    $class = 'minimal-lite-posts-lists';

                    /*Check for masonry settings*/
                    $enable_masonry_post_archive = minimal_lite_get_option( 'enable_masonry_post_archive', true );
                    if( $enable_masonry_post_archive ){
                        $class = 'masonry-grid masonry-col';
                    }
                    /**/

                    echo '<div class="'.esc_attr($class).'">';
                    /* Start the Loop */
                    while ( have_posts() ) : the_post();

                        /*
                         * Include the Post-Format-specific template for the content.
                         * If you want to override this in a child theme, then include a file
                         * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                         */
                        get_template_part( 'template-parts/content', get_post_format() );

                    endwhile;
                    echo '</div>';
                    /**
                     * Hook - minimal_lite_posts_navigation.
                     *
                     * @hooked: minimal_lite_display_posts_navigation - 10
                     */
                    do_action( 'minimal_lite_posts_navigation' );

                else :

                    get_template_part( 'template-parts/content', 'none' );

                endif; ?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
$page_layout = minimal_lite_get_page_layout();
if( 'no-sidebar' != $page_layout ){
    get_sidebar();
}
get_footer();
