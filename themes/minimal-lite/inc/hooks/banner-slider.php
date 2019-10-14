<?php

if (!function_exists('minimal_lite_banner_content')) :
    /**
     * Banner Slider Content.
     *
     * @since 1.0.0
     */
    function minimal_lite_banner_content(){

        $enable_banner_slider = minimal_lite_get_option('enable_slider_posts', true);
        if ($enable_banner_slider) {

            $slider_cat = minimal_lite_get_option('slider_cat', true);
            if (!empty($slider_cat)) {

                $slider_style = minimal_lite_get_option('slider_style_option', 'main-slider-default');
                $no_of_slider_posts = minimal_lite_get_option('no_of_slider_posts', true);
                $enable_slider_meta_info = minimal_lite_get_option('enable_slider_meta_info', true);

                $post_args = array(
                    'post_type' => 'post',
                    'posts_per_page' => $no_of_slider_posts,
                    'post_status' => 'publish',
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'category',
                            'field' => 'term_id',
                            'terms' => $slider_cat,
                        ),
                    ),
                );
                $slider_post = new WP_Query($post_args);
                if ($slider_post->have_posts()):
                    $slider_nav = '';
                    ?>
                    <?php
                    if ($slider_style == 'main-slider-default') {
                        $slider_style = "main-slider-default";
                    } else {
                        $slider_style = "main-slider-fullscreen";
                    }
                    ?>
                    <section class="section-block main-slider-block  <?php echo esc_html($slider_style); ?>">
                        <div class="main-slider-area">
                            <div class="banner-slider">
                                    <?php
                                    while ($slider_post->have_posts()):$slider_post->the_post();
                                        $slider_img = $slider_img_class = '';
                                        ?>
                                            <div class="slide item">
                                                <div class="slider-wrapper">
                                                    <?php
                                                    if(has_post_thumbnail()){
                                                        $slider_img_class = 'bg-image ';
                                                        $image = get_the_post_thumbnail_url(get_the_ID(), 'full');
                                                        $slider_img = '<img src="' . esc_url($image) . '">';
                                                    }
                                                    ?>
                                                    
                                                    <?php 
                                                    $enable_slider_overlay = minimal_lite_get_option('enable_slider_overlay', true);
                                                    if ($enable_slider_overlay == true) {
                                                        $enable_slider_overlay = 'slide-overlay-enabled';
                                                    } else {
                                                        $enable_slider_overlay = 'slide-overlay-disabled';
                                                    } ?>

                                                    <div class="<?php echo esc_attr($slider_img_class);?> slide-bg <?php echo esc_attr($enable_slider_overlay); ?>">
                                                        <?php echo $slider_img; ?>
                                                    </div>
                                                    <div class="slide-text">
                                                        <div class="slide-text-wrapper">
                                                            <?php if($enable_slider_meta_info):?>
                                                                <div class="slide-categories visible hidden-xs">
                                                                    <?php $categories_list = get_the_category_list(esc_html__(' #', 'minimal-lite'));
                                                                        if ($categories_list) {
                                                                            printf(esc_html__('#%1$s', 'minimal-lite'), $categories_list);
                                                                        }?>
                                                                </div>
                                                            <?php endif;?>
                                                            <h2 class="slide-title">
                                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                            </h2>
                                                            <?php if($enable_slider_meta_info):?>
                                                                <?php minimal_lite_posted_date_author(); ?>
                                                            <?php endif;?>
                                                            <div class="slider-description">
                                                                <?php the_excerpt(); ?>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    <?php endwhile; wp_reset_postdata(); ?>
                                </div>
                        </div>
                    </section>
                <?php endif;
            }
        }
    }
endif;
add_action('minimal_lite_home_section', 'minimal_lite_banner_content', 10);
