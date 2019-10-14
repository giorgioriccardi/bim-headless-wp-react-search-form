<?php
if (!function_exists('minimal_lite_display_inner_header')) :
    /**
     * Inner Pages Header.
     *
     * @since 1.0.0
     */
    function minimal_lite_display_inner_header()
    {
        if(is_singular()){
            ?>
            <?php
            $enable_header_image_class = '';
            if (has_header_image()) {
                $enable_header_image_class = "header-image-enabled";
            } else {
                $enable_header_image_class = "header-image-disabled";
            }
            ?>

            <?php $header_image = minimal_lite_get_option('enable_header_overlay', false);
            $header_image_class = "";
            if ($header_image = false) {
                $header_image_class = "header-overlay-disabled";
            } else {
                $header_image_class = "header-overlay-enabled";
            }
            ?>
            <div class="inner-banner data-bg <?php echo esc_attr($enable_header_image_class); ?> <?php echo esc_attr($header_image_class); ?>" data-background="<?php echo(get_header_image()); ?>">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="primary-font thememattic-bredcrumb">
                                <?php
                                /**
                                 * Hook - minimal_lite_display_breadcrumb.
                                 *
                                 * @hooked minimal_lite_breadcrumb_content - 10
                                 */
                                do_action('minimal_lite_display_breadcrumb');
                                ?>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                            <?php if (!is_page()) { ?>
                                <header class="entry-header">
                                    <div class="entry-meta entry-inner primary-font small-font">
                                        <?php minimal_lite_posted_on(); ?>
                                    </div>
                                </header>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <div class="inner-banner-overlay"></div>
            </div>
            <?php
            }else{
            ?>
            <div class="inner-banner">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="primary-font thememattic-bredcrumb">
                                <?php
                                /**
                                 * Hook - minimal_lite_display_breadcrumb.
                                 *
                                 * @hooked minimal_lite_breadcrumb_content - 10
                                 */
                                do_action('minimal_lite_display_breadcrumb');
                                ?>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <?php if (is_404()) { ?>
                                <h1 class="entry-title"><?php esc_html_e('Oops! That page can&rsquo;t be found.', 'minimal-lite'); ?></h1>
                            <?php } elseif (is_archive()) {
                                the_archive_title('<h1 class="entry-title">', '</h1>');
                                the_archive_description('<div class="taxonomy-description">', '</div>');
                            } elseif (is_search()) { ?>
                                <h1 class="entry-title"><?php printf(esc_html__('Search Results for: %s', 'minimal-lite'), '<span>' . get_search_query() . '</span>'); ?></h1>
                            <?php } else { ?>
                                <h1 class="entry-title"></h1>
                            <?php }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }
    }
endif;
add_action('minimal_lite_inner_header', 'minimal_lite_display_inner_header');