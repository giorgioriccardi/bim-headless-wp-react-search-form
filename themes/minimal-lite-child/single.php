<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Minimal_Lite
 */

get_header();?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

            <div>
                <p>business_name: <?php the_field('business_name');?></p>
                <p>licence_number: <?php the_field('licence_number');?></p>
                <p>licence_status: <?php the_field('licence_status');?></p>
                <p>business_phone: <?php the_field('business_phone');?></p>
                <p>business_owner: <?php the_field('business_owner');?></p>
                <p>email_address: <?php the_field('email_address');?></p>
                <p>website_address: <?php the_field('website_address');?></p>
                <p>business_address: <?php the_field('business_address');?></p>
                <p>naics_code:
<?php
// Loop example
// $terms = get_terms( 'naics_code', 'name' );
// if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
//     echo '<ul>';
//     foreach ( $terms as $term ) {
//         echo '<li>' . $term->name . '</li>';
//     }
//     echo '</ul>';
// }
$args = array('number' => '1');
$terms = get_terms('naics_code', $args);
foreach ($terms as $term) {
    echo $term->name;
}
?>
                </p>
            </div>

		<?php
while (have_posts()): the_post();

    $format = get_post_format();
    $format = (false === $format) ? 'single' : $format;

    get_template_part('template-parts/content', $format);

    /**
     * Hook minimal_lite_before_single_nav
     *
     * @hooked minimal_lite_related_posts - 10
     */
    do_action('minimal_lite_before_single_nav');

    the_post_navigation(array(
        'next_text' => '<span class="meta-nav" aria-hidden="true">' . __('Next', 'minimal-lite') . '</span> ' .
        '<span class="screen-reader-text">' . __('Next post:', 'minimal-lite') . '</span> ' .
        '<span class="post-title">%title</span>',
        'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __('Previous', 'minimal-lite') . '</span> ' .
        '<span class="screen-reader-text">' . __('Previous post:', 'minimal-lite') . '</span> ' .
        '<span class="post-title">%title</span>',
    ));

    // If comments are open or we have at least one comment, load up the comment template.
    if (comments_open() || get_comments_number()):
        comments_template();
    endif;

endwhile; // End of the loop.
?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
$page_layout = minimal_lite_get_page_layout();
if ('no-sidebar' != $page_layout) {
    get_sidebar();
}
get_footer();
