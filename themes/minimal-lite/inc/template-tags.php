<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Minimal_Lite
 */

if ( ! function_exists( 'minimal_lite_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 */
	function minimal_lite_posted_on() {
        global $post;
        $author_id = $post->post_author;
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf( $time_string,
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( 'c' ) ),
			esc_html( get_the_modified_date() )
		);
        $archive_year  = get_the_time('Y'); 
        $archive_month = get_the_time('m'); 
        $archive_day   = get_the_time('d'); 
		if(is_single()){
            $posted_on = sprintf(
            /* translators: %s: post date. */
                esc_html_x( 'Published on : %s', 'post date', 'minimal-lite' ),
                '<a href="' . esc_url( get_day_link( $archive_year, $archive_month, $archive_day) ) . '" rel="bookmark">' . $time_string . '</a>'
            );
        }else{
            $posted_on = sprintf(
            /* translators: %s: post date. */
                esc_html_x( ' %s', 'post date', 'minimal-lite' ),
                '<a href="' . esc_url( get_day_link( $archive_year, $archive_month, $archive_day) ) . '" rel="bookmark">' . $time_string . '</a>'
            );
        }

		$byline = sprintf(
			/* translators: %s: post author. */
			esc_html_x( 'by %s', 'post author', 'minimal-lite' ),
			'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( $author_id ) ) . '">' . esc_html( get_the_author_meta( 'display_name', $author_id ) ) . '</a></span>'
		);

		if(is_single()){
            echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.
        }else{

            $categories_list = '';

            // Hide category and tag text for pages.
            if ( 'post' === get_post_type() ) {
                /* translators: used between list items, there is a space after the comma */
                $categories_list = get_the_category_list( esc_html__( ', ', 'minimal-lite' ) );
            }
		    ?>
            <span class="posted-on">
                <span class="thememattic-icon ion-android-alarm-clock"></span>
                <?php echo $posted_on;?>
            </span>
            <?php
            if ( $categories_list ) {
                /* translators: 1: list of categories. */
                printf( '<span class="cat-links"><span class="thememattic-icon ion-ios-folder-outline"></span>' . esc_html__( ' %1$s', 'minimal-lite' ) . '</span>', $categories_list ); // WPCS: XSS OK.
            }
        }
	}
endif;


if ( ! function_exists( 'minimal_lite_posted_date_author' ) ) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function minimal_lite_posted_date_author() {
        global $post;
        $author_id = $post->post_author;
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf( $time_string,
            esc_attr( get_the_date( 'c' ) ),
            esc_html( get_the_date() ),
            esc_attr( get_the_modified_date( 'c' ) ),
            esc_html( get_the_modified_date() )
        );
        $archive_year  = get_the_time('Y'); 
        $archive_month = get_the_time('m'); 
        $archive_day   = get_the_time('d'); 
        if(is_single()){
            $posted_on = sprintf(
            /* translators: %s: post date. */
                esc_html_x( 'Published on %s', 'post date', 'minimal-lite' ),
                '<a href="' . esc_url( get_day_link( $archive_year, $archive_month, $archive_day) ) . '" rel="bookmark">' . $time_string . '</a>'
            );
        }else{
            $posted_on = sprintf(
            /* translators: %s: post date. */
                esc_html_x( ' %s', 'post date', 'minimal-lite' ),
                '<a href="' . esc_url( get_day_link( $archive_year, $archive_month, $archive_day) ) . '" rel="bookmark">' . $time_string . '</a>'
            );
        }

        $byline = sprintf(
            /* translators: %s: post author. */
            esc_html_x( 'by %s', 'post author', 'minimal-lite' ),
            '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( $author_id ) ) . '">' . esc_html( get_the_author_meta( 'display_name', $author_id ) ) . '</a></span>'
        );

        echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.
    }
endif;


if (!function_exists('minimal_lite_posted_date_only')) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function minimal_lite_posted_date_only()
    {
        global $post;
        $author_id = $post->post_author;
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if (get_the_time('U') !== get_the_modified_time('U')) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf($time_string,
            esc_attr(get_the_date('c')),
            esc_html(get_the_date()),
            esc_attr(get_the_modified_date('c')),
            esc_html(get_the_modified_date())
        );
        $archive_year  = get_the_time('Y'); 
        $archive_month = get_the_time('m'); 
        $archive_day   = get_the_time('d'); 
        $posted_on = sprintf(
            esc_html__( ' %s', 'minimal-lite' ),
                                                                   
            '<a href="' . esc_url(get_day_link( $archive_year, $archive_month, $archive_day)) . '" rel="bookmark">'. '<span class="thememattic-icon ion-android-alarm-clock"></span> ' . $time_string . '</a>'
        );

        echo '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.
    }
endif;


if (!function_exists('minimal_lite_entry_category')) :
    /**
     * Prints HTML with meta information for the categories, tags and comments.
     */
    function minimal_lite_entry_category()
    {
        // Hide category and tag text for pages.
        if ('post' === get_post_type()) {
            /* translators: used between list items, there is a space after the comma */
            $categories_list = get_the_category_list(esc_html__(' #', 'minimal-lite'));
            if ($categories_list && minimal_lite_categorized_blog()) {
                printf(esc_html__('#%1$s', 'minimal-lite'), $categories_list);
            }
        }
    }
endif;

if (!function_exists('minimal_lite_posted_comment')) :
    function minimal_lite_posted_comment()
    {
        if (!is_single() && !post_password_required() && (comments_open() || get_comments_number())) {
            echo '<span class="comments-link"><span class="thememattic-icon ion-chatbubbles"></span> ';
            comments_popup_link(esc_html__(' 0 ', 'minimal-lite'), esc_html__(' 1 ', 'minimal-lite'), esc_html__(' % ', 'minimal-lite'));
            echo '</span>';
        } 
    }
endif;

if ( ! function_exists( 'minimal_lite_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function minimal_lite_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'minimal-lite' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="cat-links"> <span class="thememattic-icon ion-ios-folder-outline"></span>' . esc_html__( ' %1$s', 'minimal-lite' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'minimal-lite' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links"><span class="thememattic-icon ion-ios-pricetags-outline"></span>' . esc_html__( ' %1$s', 'minimal-lite' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

        if ( is_single() ){
            edit_post_link(
                sprintf(
                    wp_kses(
                    /* translators: %s: Name of current post. Only visible to screen readers */
                        __( 'Edit <span class="screen-reader-text">%s</span>', 'minimal-lite' ),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    get_the_title()
                ),
                '<span class="edit-link">',
                '</span>'
            );
        }

	}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function minimal_lite_categorized_blog()
{
    if (false === ($all_the_cool_cats = get_transient('minimal_lite_categories'))) {
        // Create an array of all the categories that are attached to posts.
        $all_the_cool_cats = get_categories(array(
            'fields' => 'ids',
            'hide_empty' => 1,
            // We only need to know if there is more than one category.
            'number' => 2,
        ));

        // Count the number of categories that are attached to the posts.
        $all_the_cool_cats = count($all_the_cool_cats);

        set_transient('minimal_lite_categories', $all_the_cool_cats);
    }

    if ($all_the_cool_cats > 1) {
        // This blog has more than 1 category so minimal_lite_categorized_blog should return true.
        return true;
    } else {
        // This blog has only 1 category so minimal_lite_categorized_blog should return false.
        return false;
    }
}


if ( ! function_exists( 'minimal_lite_archive_title' ) ) :
    /**
     * Modifies post archive titles
     */
    function minimal_lite_archive_title( $title) {
        if ( is_category() ) {
            $title = single_cat_title( '', false );
        } elseif ( is_tag() ) {
            $title = single_tag_title( '', false );
        } elseif ( is_author() ) {
            $title = '<span class="vcard">' . get_the_author() . '</span>';
        } elseif ( is_post_type_archive() ) {
            $title = post_type_archive_title( '', false );
        } elseif ( is_tax() ) {
            $title = single_term_title( '', false );
        }
        return $title;
    }
endif;
add_filter( 'get_the_archive_title', 'minimal_lite_archive_title' );
