<?php
/**
 * The template for displaying single posts and pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

get_header();
?>

<main id="site-content" role="main">

	<?php

if (have_posts()) {

    while (have_posts()) {
        the_post();

        get_template_part('template-parts/content', get_post_type());
    }
}
?>

<p>business_name: <?php the_field('business_name');?></p>
<p>licence_number: <?php the_field('licence_number');?></p>
<p>licence_status: <?php the_field('licence_status');?></p>
<p>business_phone: <?php the_field('business_phone');?></p>
<p>business_owner: <?php the_field('business_owner');?></p>
<p>email_address: <?php the_field('email_address');?></p>
<p>website_address: <?php the_field('website_address');?></p>
<p>business_address: <?php the_field('business_address');?></p>
<p>naics_code: custom taxonomy tag</p>

</main><!-- #site-content -->

<?php get_template_part('template-parts/footer-menus-widgets');?>

<?php get_footer();?>
