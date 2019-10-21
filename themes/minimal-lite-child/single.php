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
                <p>Business Name: <?php the_field('business_name');?></p>
                <p>Licence Number: <?php the_field('licence_number');?></p>
                <p>Licence Status: <?php the_field('licence_status');?></p>
                <p>Business Phone #: <?php //the_field('business_phone');?>
                    <a
                        class=""
                        href="tel:<?php the_field('business_phone');?>"
                        target="_blank"
                        title="<?php the_field('business_phone');?>">
                        <?php the_field('business_phone');?>
                    </a>
                </p>
                <p>Owner: <?php the_field('business_owner');?></p>
                <p>Email: <?php // the_field('email_address');?>
                    <a
                        class=""
                        href="mailto:<?php the_field('email_address');?>"
                        target="_blank"
                        title="<?php the_field('email_address');?>">
                        <?php the_field('email_address');?>
                    </a>
                </p>
                <p>Website: <?php // the_field('website_address');?>
                    <a
                        class=""
                        href="<?php echo esc_url(get_field('website_address')); ?>"
                        target="_blank"
                        rel=”nofollow”
                        title="<?php echo esc_html(get_field('website_address')); ?>">
                        <?php echo esc_html(get_field('website_address')); ?>
                    </a>
                </p>
                <p>Address:
<?php // the_field('business_address');
$map_location = get_field('business_address');
echo $map_location['address'];
?>
                </p>
                <p>NAICS:
<?php
// SSWS Loop example
// $terms = get_terms( 'naics_code', 'name' );
// if ( ! empty( $terms ) && ! is_wp_error( $terms ) ){
//     echo '<ul>';
//     foreach ( $terms as $term ) {
//         echo '<li>' . $term->name . '</li>';
//     }
//     echo '</ul>';
// }
?>
<?php
// !Only works for the first item of the loop
// $args = array('number' => '1');
// $terms = get_terms('naics_code', $args);
// foreach ($terms as $term) {
//     $term_link = get_term_link($term);
//     // echo $term->name;
//     echo '<a href="' . esc_url($term_link) . '">' . $term->name . '</a>';
// }
?>

<?php
$terms = get_the_terms($post->ID, 'naics_code');
foreach ($terms as $term) {
    $termlinks = get_term_link($term);
    echo '<a href="' . $termlinks . '" title="' . $term->description . '">' . $term->name . ' - ' . $term->description . '</a>';
}
?>

<!-- SSWS naics_code loop with link -->
<?php
// $terms = get_terms('naics_code');
// echo '<ul>';
// foreach ($terms as $term) {
//     // The $term is an object, so we don't need to specify the $taxonomy.
//     $term_link = get_term_link($term);
//     // If there was an error, continue to the next term.
//     if (is_wp_error($term_link)) {
//         continue;
//     }
//     // We successfully got a link. Print it out.
//     echo '<li><a href="' . esc_url($term_link) . '">' . $term->name . '</a></li>';
// }
// echo '</ul>';
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
