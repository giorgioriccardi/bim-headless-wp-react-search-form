(function (e) {
    "use strict";
    var n = window.WRITE_JS || {};
    var iScrollPos = 0;

    /*Used for ajax loading posts*/
    var loadType, loadButton, loader, pageNo, loading, morePost, scrollHandling;
    /**/

    n.stickyMenu = function () {
        e(window).scrollTop() > 350 ? e("body").addClass("nav-affix") : e("body").removeClass("nav-affix")
    },
        n.mobileMenu = {
            init: function () {
                this.toggleMenu(), this.menuMobile(), this.menuArrow()
            },
            toggleMenu: function () {
                e('#thememattic-header').on('click', '.toggle-menu', function (event) {
                    var ethis = e('.main-navigation .menu .menu-mobile');
                    if (ethis.css('display') == 'block') {
                        ethis.slideUp('300');
                        e("#thememattic-header").removeClass('mmenu-active');
                    } else {
                        ethis.slideDown('300');
                        e("#thememattic-header").addClass('mmenu-active');
                    }
                    e('.ham').toggleClass('exit');
                });
                e('#thememattic-header .main-navigation ').on('click', '.menu-mobile a i', function (event) {
                    event.preventDefault();
                    var ethis = e(this),
                        eparent = ethis.closest('li'),
                        esub_menu = eparent.find('> .sub-menu');
                    if (esub_menu.css('display') == 'none') {
                        esub_menu.slideDown('300');
                        ethis.addClass('active');
                    } else {
                        esub_menu.slideUp('300');
                        ethis.removeClass('active');
                    }
                    return false;
                });
            },
            menuMobile: function () {
                if (e('.main-navigation .menu > ul').length) {
                    var ethis = e('.main-navigation .menu > ul'),
                        eparent = ethis.closest('.main-navigation'),
                        pointbreak = eparent.data('epointbreak'),
                        window_width = window.innerWidth;
                    if (typeof pointbreak == 'undefined') {
                        pointbreak = 991;
                    }
                    if (pointbreak >= window_width) {
                        ethis.addClass('menu-mobile').removeClass('menu-desktop');
                        e('.main-navigation .toggle-menu').css('display', 'inline-block');
                    } else {
                        ethis.addClass('menu-desktop').removeClass('menu-mobile').css('display', '');
                        e('.main-navigation .toggle-menu').css('display', '');
                    }
                }
            },
            menuArrow: function () {
                if (e('#thememattic-header .main-navigation div.menu > ul').length) {
                    e('#thememattic-header .main-navigation div.menu > ul .sub-menu').parent('li').find('> a').append('<i class="ion-ios-arrow-down">');
                }
            }
        },

        n.SagaSearch = function () {
            e('.icon-search').on('click', function (event) {
                e('body').toggleClass('reveal-search');
            });
            e('.close-popup').on('click', function (event) {
                e('body').removeClass('reveal-search');
            });
        },

        n.SagePreloader = function () {
            e(window).load(function(){
                e("body").addClass("page-loaded");
            });
        },

        n.OffcanvasNav = function () {
            e('#push-trigger').sidr({
                name: 'offcanvas-panel',
                side: 'right'
            });

            e('.sidr-class-sidr-button-close').click(function () {
                e.sidr('close', 'offcanvas-panel');
            });
        },

        n.SageSlider = function () {
            var slider_loop = true;
            if(!writeBlogVal.enable_slider_loop){
                slider_loop = false;
            }

            e(".banner-slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                autoplay: true,
                autoplaySpeed: 8000,
                infinite: slider_loop,
                dots: true,
                arrows: false,
                speed: 500,
                centerMode: false,
                draggable: true,
                touchThreshold: 20,
                cssEase: 'cubic-bezier(0.28, 0.12, 0.22, 1)'
            });

            if(e('.insta-slider').length > 0 ){
                e('.insta-slider.insta-slider-enable').slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: false,
                    nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                    prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>',
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }

            /*Single Column Gallery*/
            n.SingleColGallery('gallery-columns-1');
            /**/

        },

        n.SingleColGallery = function (gal_selector) {
            if(e.isArray(gal_selector)){
                e.each(gal_selector, function (index, value) {
                    e("#"+value).find('.gallery-columns-1').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: false,
                        nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                        prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>'
                    });
                });
            }else{
                e("."+gal_selector).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: false,
                    nextArrow: '<i class="navcontrol-icon slide-next ion-ios-arrow-right"></i>',
                    prevArrow: '<i class="navcontrol-icon slide-prev ion-ios-arrow-left"></i>'
                });
            }
        },

        n.MagnificPopup = function () {
            e('.widget .gallery').each(function () {
                e(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300,
                        opener: function (element) {
                            return element.find('img');
                        }
                    }
                });
            });

            /*Gallery Zoom*/
            n.GalleryPopup();
            /**/

        },

        n.GalleryPopup = function() {
            e('.entry-content .gallery, .wp-block-gallery').each(function() {
                e(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled:true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300,
                        opener: function (element) {
                            return element.find('img');
                        }
                    }
                });
            });
        },

        n.DataBackground = function () {
            var pageSection = e(".data-bg");
            pageSection.each(function (indx) {

                if (e(this).attr("data-background")) {
                    e(this).css("background-image", "url(" + e(this).data("background") + ")");
                }
            });

            e('.bg-image').each(function () {
                var src = e(this).children('img').attr('src');
                e(this).css('background-image', 'url(' + src + ')');
            });
        },

        // SHOW/HIDE SCROLL UP //
        n.show_hide_scroll_top = function () {
            if (e(window).scrollTop() > e(window).height() / 2) {
                e("#scroll-up").fadeIn(300);
            } else {
                e("#scroll-up").fadeOut(300);
            }
        },

        // SCROLL UP //
        n.scroll_up = function () {
            e("#scroll-up").on("click", function () {
                e("html, body").animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

        },

        n.ms_masonry = function () {
            if( e('.masonry-grid').length > 0 ){

                /*Default masonry animation*/
                var hidden = 'scale(0.5)';
                var visible = 'scale(1)';
                /**/

                /*Get masonry animation*/
                if (writeBlogVal.masonry_animation === 'none') {
                    hidden = 'translateY(0)';
                    visible = 'translateY(0)';
                }

                if (writeBlogVal.masonry_animation === 'slide-up') {
                    hidden = 'translateY(50px)';
                    visible = 'translateY(0)';
                }

                if (writeBlogVal.masonry_animation === 'slide-down') {
                    hidden = 'translateY(-50px)';
                    visible = 'translateY(0)';
                }

                if (writeBlogVal.masonry_animation === 'zoom-out') {
                    hidden = 'translateY(-20px) scale(1.25)';
                    visible = 'translateY(0) scale(1)';
                }
                /**/

                var $grid = e('.masonry-grid').imagesLoaded( function() {
                    //e('.masonry-grid article').fadeIn();
                    $grid.masonry({
                        itemSelector: 'article',
                        hiddenStyle: {
                            transform: hidden,
                            opacity: 0
                        },
                        visibleStyle: {
                            transform: visible,
                            opacity: 1
                        }
                    });
                });
            }
        },

        n.thememattic_matchheight = function () {
            jQuery('.widget-area').theiaStickySidebar({
                additionalMarginTop: 30
            });
        },
        n.thememattic_reveal = function () {
            e('#thememattic-reveal').on('click', function(event) {
                e('body').toggleClass('reveal-box');
            });
            e('.close-popup').on('click', function(event) {
                e('body').removeClass('reveal-box');
            });
        },

        n.setLoadPostDefaults = function () {
            if(  e('.load-more-posts').length > 0 ){
                loadButton = e('.load-more-posts');
                loader = e('.load-more-posts .ajax-loader');
                loadType = loadButton.attr('data-load-type');
                pageNo = 2;
                loading = false;
                morePost = true;
                scrollHandling = {
                    allow: true,
                    reallow: function() {
                        scrollHandling.allow = true;
                    },
                    delay: 400
                };
            }
        },

        n.fetchPostsOnScroll = function () {
            if(  e('.load-more-posts').length > 0 && 'scroll' === loadType ){
                var iCurScrollPos = e(window).scrollTop();
                if( iCurScrollPos > iScrollPos ){
                    if( ! loading && scrollHandling.allow && morePost ) {
                        scrollHandling.allow = false;
                        setTimeout(scrollHandling.reallow, scrollHandling.delay);
                        var offset = e(loadButton).offset().top - e(window).scrollTop();
                        if( 2000 > offset ) {
                            loading = true;
                            n.ShowPostsAjax();
                        }
                    }
                }
                iScrollPos = iCurScrollPos;
            }
        },

        n.fetchPostsOnClick = function () {
            if( e('.load-more-posts').length > 0 && 'click' === loadType ){
                e('.load-more-posts a').on('click',function (event) {
                    event.preventDefault();
                    n.ShowPostsAjax();
                });
            }
        },

        n.ShowPostsAjax = function () {
            e.ajax({
                type : 'GET',
                url : writeBlogVal.ajaxurl,
                data : {
                    action : 'minimal_lite_load_more',
                    nonce: writeBlogVal.nonce,
                    page: pageNo,
                    post_type: writeBlogVal.post_type,
                    search: writeBlogVal.search,
                    cat: writeBlogVal.cat,
                    taxonomy: writeBlogVal.taxonomy,
                    author: writeBlogVal.author,
                    year: writeBlogVal.year,
                    month: writeBlogVal.month,
                    day: writeBlogVal.day
                },
                dataType:'json',
                beforeSend: function() {
                    loader.addClass('ajax-loader-enabled');
                },
                success : function( response ) {
                    if(response.success){

                        var gallery = false;
                        var gal_selectors = [];
                        var $content_join = response.data.content.join('');

                        if ($content_join.indexOf("gallery-columns-1") >= 0){
                            gallery = true;
                            /*Push the post ids having galleries so that new gallery instance can be created*/
                            e($content_join).find('.entry-gallery').each(function(){
                                gal_selectors.push(e(this).closest('article').attr('id'));
                            });
                        }

                        if( e('.masonry-grid').length > 0 ){
                            var $content = e( $content_join );
                            $content.hide();
                            var $grid = e('.masonry-grid');
                            $grid.append( $content );
                            $grid.imagesLoaded(function () {

                                $content.show();

                                /*Init new Gallery*/
                                if ( true === gallery ){
                                    n.SingleColGallery(gal_selectors);
                                }
                                /**/

                                if(writeBlogVal.relayout_masonry){
                                    $grid.masonry('appended', $content).masonry();
                                }else{
                                    $grid.masonry('appended', $content);
                                }

                                loader.removeClass('ajax-loader-enabled');
                            });
                        }else{
                            e('.minimal-lite-posts-lists').append( response.data.content );
                            /*Init new Gallery*/
                            if ( true === gallery ){
                                n.SingleColGallery(gal_selectors);
                            }
                            /**/
                            loader.removeClass('ajax-loader-enabled');
                        }

                        pageNo++;
                        loading = false;
                        if(!response.data.more_post){
                            morePost = false;
                            loadButton.fadeOut();
                        }

                        /*For audio and video to work properly after ajax load*/
                        e('video, audio').mediaelementplayer({ alwaysShowControls: true });
                        /**/

                        /*For Gallery to work*/
                        n.GalleryPopup();
                        /**/

                        loader.removeClass('ajax-loader-enabled');


                    }else{
                        loadButton.fadeOut();
                    }
                }
            });
        },

        e(document).ready(function () {
            n.mobileMenu.init(), n.SagaSearch(), n.SagePreloader(), n.OffcanvasNav(), n.SageSlider(), n.MagnificPopup(), n.DataBackground(), n.scroll_up(), n.thememattic_reveal(), n.thememattic_matchheight(), n.ms_masonry(), n.setLoadPostDefaults(), n.fetchPostsOnClick();
        }),
        e(window).scroll(function () {
            n.stickyMenu(), n.show_hide_scroll_top(),  n.fetchPostsOnScroll();
        }),
        e(window).resize(function () {
            n.mobileMenu.menuMobile();
        })
})(jQuery);