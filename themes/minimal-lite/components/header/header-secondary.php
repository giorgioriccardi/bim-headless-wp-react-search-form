<?php
/**
 * Header Style 2
 *
 *
 * @package Minimal_Lite
 */
?>

<header id="thememattic-header" class="site-header site-header-secondary">

    <div class="main-header">
        <div class="container-fluid">
            <div class="site-branding">
                <?php
                the_custom_logo();
                if (is_front_page() && is_home()) : ?>
                    <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
                                              rel="home"><?php bloginfo('name'); ?></a></h1>
                <?php else : ?>
                    <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
                                             rel="home"><?php bloginfo('name'); ?></a></p>
                <?php
                endif;

                $description = get_bloginfo('description', 'display');
                if ($description || is_customize_preview()) : ?>
                    <p class="site-description primary-font">
                        <?php echo $description; ?>
                    </p>
                <?php
                endif;
                ?>
            </div>
            <div class="thememattic-navigation">
                <nav id="site-navigation" class="main-navigation">
                            <span class="toggle-menu" aria-controls="primary-menu" aria-expanded="false">
                                 <span class="screen-reader-text">
                                    <?php esc_html_e('Primary Menu', 'minimal-lite'); ?>
                                </span>
                                <i class="ham"></i>
                            </span>
                    <?php
                    if (has_nav_menu('menu-1')) {
                        wp_nav_menu(array(
                            'theme_location' => 'menu-1',
                            'menu_id' => 'primary-menu',
                            'container' => 'div',
                            'container_class' => 'menu',
                            'depth' => 3,
                        ));
                    } else {
                        wp_nav_menu(array(
                            'menu_id' => 'primary-menu',
                            'container' => 'div',
                            'container_class' => 'menu',
                            'depth' => 3,
                        ));
                    } ?>

                    <?php                    
                    $enable_social_menu_in_header = minimal_lite_get_option('enable_social_menu_in_header', false);
                    if ($enable_social_menu_in_header == true) { ?>
                        <?php if (has_nav_menu('social-nav')) { ?>
                            <div class="header-social-icon hidden-xs">
                                <div class="social-icons">
                                    <?php
                                    wp_nav_menu(
                                        array('theme_location' => 'social-nav',
                                            'link_before' => '<span>',
                                            'link_after' => '</span>',
                                            'menu_id' => 'social-menu',
                                            'fallback_cb' => false,
                                            'menu_class' => false
                                        )); ?>
                                </div>
                            </div>
                        <?php } ?>
                    <?php } ?>

                    <?php $side_panel_enable = minimal_lite_get_option('enable_side_panel', true);
                    if ($side_panel_enable != true) { ?>
                        <div class="theme-mode header-theme-mode"></div>
                    <?php } ?>

                    <div class="icon-search">
                        <i class="thememattic-icon ion-ios-search"></i>
                    </div>
                </nav><!-- #site-navigation -->
            </div>
        </div>

        <?php $enable_header_images = minimal_lite_get_option('enable_header_overlay', false);
        if ($enable_header_images == false) {
        } else { ?>
            <div class="header-image-overlay"></div>
        <?php }
        ?>
    </div>

</header>




