<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Minimal_Lite
 */

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <div id="business-data">
            <!-- <p>Business Name: <?php // the_field('business_name');
                                    ?></p> -->
            <p>Licence Number: <?php the_field('licence_number'); ?></p>
            <p>Licence Status: <?php the_field('licence_status'); ?></p>
            <p>Phone #: <?php //the_field('business_phone');
                        ?>
                <a class="formatted_phone" href="tel:<?php the_field('business_phone'); ?>" target="_blank"
                    title="Call <?php the_field('business_name'); ?> at <?php the_field('business_phone'); ?>">
                    <?php the_field('business_phone'); ?>
                </a>
            </p>
            <p>Owner: <?php the_field('business_owner'); ?></p>
            <p>Email: <?php // the_field('email_address');
                        ?>
                <a class="" href="mailto:<?php the_field('email_address'); ?>" target="_blank"
                    title="<?php the_field('email_address'); ?>">
                    <?php the_field('email_address'); ?>
                </a>
            </p>
            <p>Website: <?php // the_field('website_address');
                        ?>
                <a class="" href="<?php echo esc_url(get_field('website_address')); ?>" target="_blank" rel=”nofollow”
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
            <!-- SSWS 11/2020 -->
            <?php
            /********************************************************/
            // BIM Search if condition for Accomodation categories
            /********************************************************/
            add_filter('the_content', 'ssws_add_designated_individual');
            function ssws_add_designated_individual()
            {
                $cat_id = get_cat_ID('accommodations');
                $children = get_term_children($cat_id, 'category');

                if (is_single() && (has_category($cat_id) || has_category($children))) {
            ?>

            <p>Designated Individual Name:
                <?php the_field('designated_individual_name'); ?>
            </p>
            <p>Designated Individual Phone Number:
                <a class="formatted_phone" href="tel:<?php the_field('designated_individual_phone_number'); ?>"
                    target="_blank"
                    title="Call <?php the_field('designated_individual_name'); ?> at <?php the_field('designated_individual_phone_number'); ?>">
                    <?php the_field('designated_individual_phone_number'); ?>
                </a>
            </p>
            <?php } ?>

            <p>NAICS:
                <?php
                    $terms = get_the_terms($post->ID, 'naics_code');
                    foreach ($terms as $term) {
                        $termlinks = get_term_link($term);
                        echo '<a href="' . $termlinks . '" title="' . $term->description . '">' . $term->name . ' - ' . $term->description . '</a>';
                    }
                    ?>
            </p>

            <?php } // end ssws_add_designated_individual()
            ?>
            <!-- end SSWS designated individuals -->

        </div>

        <?php
        while (have_posts()) : the_post();

            $format = get_post_format();
            $format = (false === $format) ? 'single' : $format;

            get_template_part('template-parts/content', $format);

            // PRINT-O-MATIC
        ?>
        <article class="print-me-container">
            <?php echo do_shortcode('[print-me]'); ?>
        </article>
        <?php
            // https://plugins.twinpictures.de/plugins/print-o-matic/documentation/

            /**
             * Hook minimal_lite_before_single_nav
             *
             * @hooked minimal_lite_related_posts - 10
             */
            do_action('minimal_lite_before_single_nav');

            the_post_navigation(array(
                'next_text' => '<span class="meta-nav" aria-hidden="true">' . __('&rarr;', 'minimal-lite') . '</span> ' .
                    '<span class="screen-reader-text">' . __('Next post:', 'minimal-lite') . '</span> ' .
                    '<span class="post-title">%title</span>',
                'prev_text' => '<span class="meta-nav" aria-hidden="true">' . __('&larr;', 'minimal-lite') . '</span> ' .
                    '<span class="screen-reader-text">' . __('Previous post:', 'minimal-lite') . '</span> ' .
                    '<span class="post-title">%title</span>',
            ));

            // If comments are open or we have at least one comment, load up the comment template.
            if (comments_open() || get_comments_number()) :
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