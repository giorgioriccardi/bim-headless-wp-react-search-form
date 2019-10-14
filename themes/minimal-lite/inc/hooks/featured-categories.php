<?php

if (!function_exists('minimal_lite_featured_categories')) :
    /**
     * Featured Categories.
     *
     * @since 1.0.0
     */
    function minimal_lite_featured_categories(){

        $enable_ft_categories = minimal_lite_get_option('enable_ft_categories', true);
        $cats_array = array( 'first', 'second', 'third', 'fourth' );

        if ($enable_ft_categories) {
            ?>
            <section class="section-block section-featured">
                <div class="container-fluid">
                <?php
                foreach ($cats_array as $cat){
                    $ft_cat = minimal_lite_get_option($cat.'_ft_cat', true);
                    $ft_cat_image = minimal_lite_get_option($cat.'_ft_cat_image', true);
                    if( !empty($ft_cat) ){
                        $cat_link = get_category_link( $ft_cat );
                        ?>
                        <div class="col-md-3 col-sm-6 featured-item">
                            <figure class="post-img">
                                <?php if( !empty($ft_cat_image)): ?>
                                    <img src="<?php echo esc_url($ft_cat_image); ?>" alt="post image">
                                <?php endif;?>
                            </figure>
                            <figcaption>
                                <h3 class="featured-item-title entry-title">
                                    <a href="<?php echo esc_url( $cat_link ); ?>"><?php echo esc_html(get_cat_name($ft_cat))?></a>
                                </h3>
                                <a href="<?php echo esc_url( $cat_link ); ?>" class="featured-item-more">
                                    <?php _e('Learn more', 'minimal-lite')?>
                                </a>
                            </figcaption>
                        </div>
                        <?php
                    }
                }
                ?>
                </div>
            </section>
            <?php
        }
    }
endif;
add_action('minimal_lite_home_section', 'minimal_lite_featured_categories', 20);