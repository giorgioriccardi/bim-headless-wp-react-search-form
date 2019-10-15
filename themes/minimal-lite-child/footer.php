<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Minimal_Lite
 */
?>
<?php
if (is_front_page()) {
    /**
     * Hook - minimal_lite_home_section.
     */
    do_action('minimal_lite_home_footer_section');
}
if (!is_front_page()) {
    ?>
    </div><!-- #content -->
    <?php
/**
     * Hook - minimal_lite_before_footer.
     *
     */
    do_action('minimal_lite_before_footer');
} else {
    /**
     * Hook - minimal_lite_before_home_footer.
     *
     * @hooked minimal_lite_instagram_images - 10
     * @hooked minimal_lite_mailchimp_form - 20
     */
    do_action('minimal_lite_before_home_footer');
}
?>

<?php if (is_active_sidebar('offcanvas-sidebar')): ?>
    <div id="offcanvas-panel">
        <div class="sidr-close-holder">
            <a href="#" onclick="event.preventDefault()" class="sidr-class-sidr-button-close">
                <i class="ion-ios-close-empty"></i>
            </a>
        </div>
        <div class="offcanvas-sidebar">
            <?php dynamic_sidebar('offcanvas-sidebar');?>
        </div>
    </div>
<?php endif;?>

<footer id="colophon" class="site-footer">
    <?php if (is_active_sidebar('footer-col-one') || is_active_sidebar('footer-col-two') || is_active_sidebar('footer-col-three')): ?>
        <div class="footer-widget-area">
            <div class="container-fluid">
                <div class="row">
                    <?php if (is_active_sidebar('footer-col-one')): ?>
                        <div class="col-md-4">
                            <?php dynamic_sidebar('footer-col-one');?>
                        </div>
                    <?php endif;?>
                    <?php if (is_active_sidebar('footer-col-two')): ?>
                        <div class="col-md-4">
                            <?php dynamic_sidebar('footer-col-two');?>
                        </div>
                    <?php endif;?>
                    <?php if (is_active_sidebar('footer-col-three')): ?>
                        <div class="col-md-4">
                            <?php dynamic_sidebar('footer-col-three');?>
                        </div>
                    <?php endif;?>
                </div>
            </div>
        </div>
    <?php endif;?>

    <?php
$copyright_text = minimal_lite_get_option('copyright_text', true);
if ($copyright_text):
?>
        <div class="site-copyright">
            <div class="container-fluid">
                <span><?php echo wp_kses_post($copyright_text); ?></span>
                <?php
// SSWS disabled
// $enable_footer_credit = minimal_lite_get_option('enable_footer_credit', true);
if ($enable_footer_credit) {
    printf(esc_html__('Theme: %1$s by %2$s', 'minimal-lite'), 'Minimal Lite', '<a href="http://thememattic.com/" target = "_blank" rel="designer">Thememattic</a>');
}
?>
            </div>
        </div>
    <?php endif;?>
</footer>
</div>


<a id="scroll-up">
    <span>
        <strong><?php esc_html_e('Scroll', 'minimal-lite');?></strong>
        <i class="ion-ios-arrow-thin-right icons"></i>
    </span>
</a>

</div>
<?php wp_footer();?>

</body>
</html>
