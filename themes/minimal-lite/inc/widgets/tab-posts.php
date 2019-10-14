<?php
/**
 * Adds Minimal_Lite_Tab_Posts widget.
 */
class Minimal_Lite_Tab_Posts extends WP_Widget {
    /**
     * Sets up a new widget instance.
     *
     * @since 1.0.0
     */
    function __construct() {
        parent::__construct(
            'minimal_lite_tab_posts_widget',
            esc_html__( 'ML: Tab Posts', 'minimal-lite' ),
            array( 'description' => esc_html__( 'Displays posts in tabs', 'minimal-lite' ), )
        );
    }

    /**
     * Outputs the content for the current widget instance.
     *
     * @since 1.0.0
     *
     * @param array $args     Display arguments.
     * @param array $instance Saved values from database.
     */
    public function widget( $args, $instance ) {
        echo $args['before_widget'];
        ?>
        <div class="tabbed-container">
            <div class="tabbed-head">
                <ul class="nav nav-tabs primary-background" role="tablist">
                    <li role="presentation" class="tab tab-popular active">
                        <a href="#ms-popular" aria-controls="<?php esc_html_e('Popular', 'minimal-lite'); ?>" role="tab" data-toggle="tab" class="primary-bgcolor">
                            <span class="tab-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" version="1.1" viewBox="-22 0 134 134.06032" width="20px" fill="currentcolor">
                                    <g id="surface1">
                                    <path d="M 23.347656 134.058594 C 8.445312 84.953125 39.933594 67.023438 39.933594 67.023438 C 37.730469 93.226562 52.621094 113.640625 52.621094 113.640625 C 58.097656 111.988281 68.550781 104.265625 68.550781 104.265625 C 68.550781 113.640625 63.035156 134.046875 63.035156 134.046875 C 63.035156 134.046875 82.34375 119.117188 88.421875 94.320312 C 94.492188 69.523438 76.859375 44.628906 76.859375 44.628906 C 77.921875 62.179688 71.984375 79.441406 60.351562 92.628906 C 60.933594 91.957031 61.421875 91.210938 61.796875 90.402344 C 63.886719 86.222656 67.242188 75.359375 65.277344 50.203125 C 62.511719 14.890625 30.515625 0 30.515625 0 C 33.273438 21.515625 25.003906 26.472656 5.632812 67.3125 C -13.738281 108.144531 23.347656 134.058594 23.347656 134.058594 Z M 23.347656 134.058594 " />
                                    </g>
                                </svg>
                            </span>
                            <?php esc_html_e('Popular', 'minimal-lite'); ?>
                        </a>
                    </li>
                    <li class="tab tab-recent">
                        <a href="#ms-recent" aria-controls="<?php esc_html_e('Recent', 'minimal-lite'); ?>" role="tab" data-toggle="tab" class="primary-bgcolor">
                            <span class="tab-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" version="1.1" viewBox="0 0 129 129" width="20px" fill="currentcolor">
                                  <g>
                                    <path d="m57.4,122.2c0.5,0.2 1,0.3 1.5,0.3 1.3,0 2.6-0.6 3.4-1.8l42.9-62c0.9-1.2 1-2.9 0.3-4.2-0.7-1.3-2.1-2.2-3.6-2.2l-26.6-.2 7.7-40.8c0.4-1.8-0.6-3.7-2.3-4.5-1.7-0.8-3.7-0.3-4.9,1.2l-45.5,57.3c-1,1.2-1.2,2.9-0.5,4.3 0.7,1.4 2.1,2.3 3.7,2.3l29.4,.2-7.9,45.6c-0.4,1.9 0.6,3.8 2.4,4.5zm-15.5-58.4l30-37.8-5.6,29.5c-0.2,1.2 0.1,2.4 0.9,3.4 0.8,0.9 1.9,1.5 3.1,1.5l23.7,.1-27.9,40.4 5.5-32.2c0.2-1.2-0.1-2.4-0.9-3.3-0.7-0.9-1.8-1.4-3-1.4l-25.8-.2z"/>
                                  </g>
                                </svg>
                            </span>
                            <?php esc_html_e('Recent', 'minimal-lite'); ?>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="tab-content">
                <div id="ms-popular" role="tabpanel" class="tab-pane active">
                    <?php
                    $this->render_post('popular',$instance);
                    ?>
                </div>
                <div id="ms-recent" role="tabpanel" class="tab-pane">
                    <?php
                    $this->render_post('recent',$instance);
                    ?>
                </div>
            </div>
        </div>
        <?php
        echo $args['after_widget'];
    }

    /**
     * Back-end widget form.
     *
     * @since 1.0.0
     *
     * @param array $instance Previously saved values from database.
     *
     *
     */
    public function form( $instance ) {
        $no_of_popular_posts = ! empty( $instance['no_of_popular_posts'] ) ? $instance['no_of_popular_posts'] : 5;
        $popular_content_length = ! empty( $instance['popular_content_length'] ) ? $instance['popular_content_length'] : 0;
        $no_of_recent_posts = ! empty( $instance['no_of_recent_posts'] ) ? $instance['no_of_recent_posts'] : 5;
        $recent_content_length = ! empty( $instance['recent_content_length'] ) ? $instance['recent_content_length'] : 0;
        ?>
        <h4 class="widefat" style="text-align:center;background-color:#f1f1f1;padding:5px 0;margin-top:5px;">
            <span class="field-label"><strong><?php _e('Popular','minimal-lite') ?></strong></span>
        </h4>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'no_of_popular_posts' ) ); ?>">
                <?php esc_attr_e( 'No of Posts:', 'minimal-lite' ); ?>
            </label>
            <input type="number" id="<?php echo esc_attr( $this->get_field_id( 'no_of_popular_posts' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'no_of_popular_posts' ) ); ?>" value="<?php echo esc_attr( $no_of_popular_posts ); ?>" min="1" max="5" step="1" />
        </p>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'popular_content_length' ) ); ?>">
                <?php esc_attr_e( 'Content Length (Words):', 'minimal-lite' ); ?>
            </label>
            <input type="number" id="<?php echo esc_attr( $this->get_field_id( 'popular_content_length' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'popular_content_length' ) ); ?>" value="<?php echo esc_attr( $popular_content_length ); ?>" min="0" max="40" />
        </p>
        <h4 class="widefat" style="text-align:center;background-color:#f1f1f1;padding:5px 0;margin-top:5px;">
            <span class="field-label"><strong><?php _e('Recent','minimal-lite') ?></strong></span>
        </h4>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'no_of_recent_posts' ) ); ?>">
                <?php esc_attr_e( 'No of Posts:', 'minimal-lite' ); ?>
            </label>
            <input type="number" id="<?php echo esc_attr( $this->get_field_id( 'no_of_recent_posts' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'no_of_recent_posts' ) ); ?>" value="<?php echo esc_attr( $no_of_recent_posts ); ?>" min="1" max="5" step="1" />
        </p>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'recent_content_length' ) ); ?>">
                <?php esc_attr_e( 'Content Length (Words):', 'minimal-lite' ); ?>
            </label>
            <input type="number" id="<?php echo esc_attr( $this->get_field_id( 'recent_content_length' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'recent_content_length' ) ); ?>" value="<?php echo esc_attr( $recent_content_length ); ?>" min="0" max="40" />
        </p>
        <?php
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @since 1.0.0
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update( $new_instance, $old_instance ) {
        $instance = array();

        $instance['no_of_popular_posts'] = ( ! empty( $new_instance['no_of_popular_posts'] ) ) ? absint( $new_instance['no_of_popular_posts'] ) : '';
        $instance['popular_content_length'] = ( ! empty( $new_instance['popular_content_length'] ) ) ? absint( $new_instance['popular_content_length'] ) : 0;

        $instance['no_of_recent_posts'] = ( ! empty( $new_instance['no_of_recent_posts'] ) ) ? absint( $new_instance['no_of_recent_posts'] ) : '';
        $instance['recent_content_length'] = ( ! empty( $new_instance['recent_content_length'] ) ) ? absint( $new_instance['recent_content_length'] ) : 0;

        return $instance;
    }

    /**
     * Outputs the tab posts
     *
     * @since 1.0.0
     *
     * @param array $args  Post Arguments.
     */
    public  function render_post( $type, $args ){
        $post_args = array();
        $content_length = 0;
        switch ($type) {
            case 'popular':
                $post_args = array(
                    'post_type' => 'post',
                    'post_status' => 'publish',
                    'posts_per_page' => $args['no_of_popular_posts'],
                    'orderby' => 'comment_count',
                );
                $content_length = absint($args['popular_content_length']);
                break;

            case 'recent':
                $post_args = array(
                    'post_type' => 'post',
                    'post_status' => 'publish',
                    'posts_per_page' => $args['no_of_recent_posts'],
                );
                $content_length = absint($args['recent_content_length']);
                break;

            default:
                break;
        }

        if( !empty($post_args) && is_array($post_args) ){
            $post_data = new WP_Query($post_args);
            if($post_data->have_posts()):
                echo '<ul class="article-item article-list-item article-tabbed-list article-item-left">';
                while($post_data->have_posts()):$post_data->the_post();
                ?>
                    <li class="full-item row">
                        <div class="full-item-image col-xs-4">
                            <a href="<?php the_permalink(); ?>" class="post-thumb">
                                <?php
                                if(has_post_thumbnail()){
                                    $image = get_the_post_thumbnail_url( get_the_ID(), 'thumbnail' );
                                    echo '<img src="'.esc_url($image).'">';
                                }
                                ?>
                            </a>
                        </div>
                        <div class="full-item-details col-xs-8">
                            <div class="featured-meta">
                                <span class="entry-date">
                                    <span class="thememattic-icon ion-android-alarm-clock"></span>
                                    <?php echo esc_html(get_the_date()); ?>
                                </span>
                                <span><?php _e('/', 'minimal-lite')?></span>
                                <span class="post-author">
                                <a href="<?php echo esc_url(get_author_posts_url( get_the_author_meta( 'ID' ), get_the_author_meta( 'user_nicename' ) )); ?>">
                                    <?php the_author(); ?>
                                </a>
                            </span>
                            </div>
                            <div class="full-item-content">
                                <h2 class="entry-title">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_title(); ?>
                                    </a>
                                </h2>
                                <?php if($content_length != 0):?>
                                    <div class="full-item-desc">
                                        <div class="post-description primary-font">
                                            <?php echo wp_trim_words( get_the_excerpt(), $content_length, '' );?>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </li>
                <?php
                endwhile;wp_reset_postdata();
                echo '</ul>';
            endif;
        }
    }
}