<?php
/**
 * CSS related hooks.
 *
 * This file contains hook functions which are related to CSS.
 *
 * @package Minimal_Lite
 */
if (!function_exists('minimal_lite_inline_css')) :
    /**
     * Output theme custom CSS.
     *
     * @since 1.0.0
     */
    function minimal_lite_inline_css()
    {
        global $minimal_lite_google_fonts;
        $minimal_lite_primary_color = minimal_lite_get_option('primary_color', true);
        $minimal_lite_secondary_color = minimal_lite_get_option('secondary_color', true);

        $minimal_lite_cat_grid_bgcolor = minimal_lite_get_option('full_width_grid_cat_bg_color', true);
        $minimal_lite_cat_grid_textcolor = minimal_lite_get_option('full_width_grid_cat_text_color', true);

        $minimal_lite_primary_font = $minimal_lite_google_fonts[minimal_lite_get_option('primary_font', true)];
        $minimal_lite_secondary_font = $minimal_lite_google_fonts[minimal_lite_get_option('secondary_font', true)];

        $minimal_lite_sitetitle_size = minimal_lite_get_option('site_title_text_size', true);
        $minimal_lite_font_size_p = minimal_lite_get_option('p_text_size', true);
        $minimal_lite_font_size_h1 = minimal_lite_get_option('h1_text_size', true);
        $minimal_lite_font_size_h2 = minimal_lite_get_option('h2_text_size', true);
        $minimal_lite_font_size_h3 = minimal_lite_get_option('h3_text_size', true);
        $minimal_lite_font_size_h4 = minimal_lite_get_option('h4_text_size', true);
        $minimal_lite_font_size_h5 = minimal_lite_get_option('h5_text_size', true);


        $minimal_lite_font_excerpt_size = minimal_lite_get_option('excerpt_text_size', true);

        $mailchimp_bg_color = minimal_lite_get_option('mailchimp_bg_color', true);

        $minimal_lite_footer_bg_color = minimal_lite_get_option('footer_bg_color', true);
        $minimal_lite_footer_text_color = minimal_lite_get_option('footer_text_color', true);
        ?>
        <style type="text/css">
            <?php
            if (!empty($minimal_lite_primary_color) ){
                ?>
            body .primary-background,
            body .has-post-thumbnail .panel-wrapper .read-time,
            body button:hover,
            body button:focus,
            body input[type="button"]:hover,
            body input[type="reset"]:hover,
            body input[type="reset"]:focus,
            body input[type="submit"]:hover,
            body input[type="submit"]:focus,
            body .widget .social-widget-menu ul li,
            body .comments-area .comment-list .reply,
            body .widget .social-widget-menu ul li:hover a:before,
            body .widget .social-widget-menu ul li:focus a:before,
            body .ham,
            body .ham:before,
            body .ham:after,
            body .btn-load-more{
                background: <?php echo esc_html($minimal_lite_primary_color); ?>;
            }

            <?php
            }

            if (!empty($minimal_lite_secondary_color) ){
                ?>
            body button,
            body input[type="button"],
            body input[type="reset"],
            body input[type="submit"],
            body .widget.widget_minimal_lite_tab_posts_widget ul.nav-tabs li.active a,
            body .widget.widget_minimal_lite_tab_posts_widget ul.nav-tabs > li > a:focus,
            body .widget.widget_minimal_lite_tab_posts_widget ul.nav-tabs > li > a:hover,
            body .author-info .author-social > a:hover,
            body .author-info .author-social > a:focus,
            body .widget .social-widget-menu ul li a:before,
            body .widget .social-widget-menu ul li:hover,
            body .widget .social-widget-menu ul li:focus,
            body .moretag,
            body .moretag,
            body .thememattic-search-icon:before,
            body .search-button.active .thememattic-search-icon:before,
            body .search-button.active .thememattic-search-icon:after,
            body .btn-load-more:hover,
            body .btn-load-more:focus{
                background: <?php echo esc_html($minimal_lite_secondary_color); ?>;
            }

            body .sticky header:before,
            body a:hover,
            body a:focus,
            body a:active,
            body .main-navigation .menu > ul > li.current-menu-item > a,
            body .main-navigation .menu > ul > li:hover > a,
            body .main-navigation .menu > ul > li:focus > a,
            body .sidr a:hover,
            body .sidr a:focus,
            body .page-numbers.current {
                color: <?php echo esc_html($minimal_lite_secondary_color); ?>;
            }

            body .ajax-loader,
            body .thememattic-search-icon:after{
                border-color: <?php echo esc_html($minimal_lite_secondary_color); ?> !important;
            }

            <?php
        }

        if (!empty($mailchimp_bg_color) ){
            ?>
            body .mailchimp-bgcolor  {
                background: <?php echo esc_html($mailchimp_bg_color); ?>;
            }

            <?php
        }

        if (!empty($minimal_lite_cat_grid_bgcolor) ){
            ?>
            body .section-recommended.section-bg  {
                background: <?php echo esc_html($minimal_lite_cat_grid_bgcolor); ?>;
            }

            <?php
        }

        if (!empty($minimal_lite_cat_grid_textcolor) ){
            ?>
            body .section-recommended.section-bg .section-title a,
            body .section-recommended.section-bg .home-full-grid-cat-section,
            body .section-recommended.section-bg .home-full-grid-cat-section a{
                color: <?php echo esc_html($minimal_lite_cat_grid_textcolor); ?>;
            }

            <?php
        }

        if (!empty($minimal_lite_primary_font) ){
            ?>
            body,
            body .primary-font,
            body .section-title,
            body .site .widget-title,
            body .main-navigation .menu ul li a,
            body .comment-reply-title {
                font-family: <?php echo esc_html($minimal_lite_primary_font); ?>!important;
            }

            <?php
        }

        if (!empty($minimal_lite_secondary_font) ){
            ?>
            body h1, body h2, body h3, body h4, body h5, body h6,
            body .secondary-font,
            body .site .site-title,
            body .prime-excerpt,
            body blockquote,
            body.single .entry-content:before, .page .entry-content:before{
                font-family: <?php echo esc_html($minimal_lite_secondary_font); ?> !important;
            }



            <?php
           }

           if (!empty($minimal_lite_sitetitle_size) ){
           ?>
            body .site-header-center .site-title {
                font-size: <?php echo esc_html($minimal_lite_sitetitle_size); ?>px !important;
            }

            <?php
            }

            if (!empty($minimal_lite_font_size_p) ){
                ?>
            body, body button, body input, body select, body textarea, body p {
                font-size: <?php echo absint($minimal_lite_font_size_p); ?>px !important;
            }

            <?php
        }

        if (!empty($minimal_lite_font_size_h1) ){
            ?>
            body h1 {
                font-size: <?php echo absint($minimal_lite_font_size_h1); ?>px;
            }

            <?php
        }

        if (!empty($minimal_lite_font_size_h2) ){
            ?>
            body h2,
            h2.entry-title{
                font-size: <?php echo absint($minimal_lite_font_size_h2); ?>px;
            }

            <?php
        }

        if (!empty($minimal_lite_font_size_h3) ){
            ?>
            body h3 {
                font-size: <?php echo absint($minimal_lite_font_size_h3); ?>px;
            }

            <?php
        }

        if (!empty($minimal_lite_font_size_h4) ){
            ?>
            body h4 {
                font-size: <?php echo absint($minimal_lite_font_size_h4); ?>px;
            }

            <?php
        }

        if (!empty($minimal_lite_font_size_h5) ){
            ?>
            body h5 {
                font-size: <?php echo absint($minimal_lite_font_size_h5); ?>px;
            }

            <?php
        }

        if (!empty($minimal_lite_font_excerpt_size) ){
            ?>
            body .masonry-grid.masonry-col article .entry-content,
            body .masonry-grid.masonry-col article .entry-content p{
                font-size: <?php echo absint($minimal_lite_font_excerpt_size); ?>px !important;
            }

            <?php
        }

        if (!empty($mailchimp_bg_color) ){
            ?>
            body .mailchimp-bgcolor {
                background: <?php echo esc_html($mailchimp_bg_color); ?>;
            }

            <?php
        }

        if (!empty($minimal_lite_footer_bg_color) ){
            ?>
            body .footer-widget-area {
                background: <?php echo esc_html($minimal_lite_footer_bg_color); ?>;
            }

            <?php
        }

        if (!empty($minimal_lite_footer_text_color) ){
        ?>
            body .footer-widget-area,
            body .site-footer .widget-title,
            body .site-footer .footer-widget-area,
            body .site-footer .footer-widget-area a,
            body .site-footer .footer-widget-area a:visited{
                color: <?php echo esc_html($minimal_lite_footer_text_color); ?>;
            }

            <?php
        }
        ?>
        </style>
        <?php
    }
endif;