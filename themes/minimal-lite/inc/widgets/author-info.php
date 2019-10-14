<?php
/**
 * Adds Minimal_Lite_Author_Info widget.
 */
class Minimal_Lite_Author_Info extends WP_Widget {
    /**
     * Sets up a new widget instance.
     *
     * @since 1.0.0
     */
    function __construct() {
        parent::__construct(
            'minimal_lite_author_info_widget',
            esc_html__( 'ML: Author Info', 'minimal-lite' ),
            array( 'description' => esc_html__( 'Displays author short info.', 'minimal-lite' ), )
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
        if ( ! empty( $instance['title'] ) ) {
            $title = apply_filters( 'widget_title', $instance['title'], $instance, $this->id_base );
            echo $args['before_title'] . $title . $args['after_title'];
        }
        ?>
        <div class="author-info">
                <?php if (!empty($instance['author_bg_img'])) { ?>
                    <div class="author-background bg-image">
                        <img src="<?php echo esc_url($instance['author_bg_img']); ?>">
                    </div>
                <?php } ?>
            <div class="author-image">
                <?php if (!empty($instance['author_img'])) { ?>
                    <div class="profile-image bg-image">
                        <img src="<?php echo esc_url($instance['author_img']); ?>">
                    </div>
                <?php } ?>
            </div> <!-- /#author-image -->

            <div class="author-social">
                <?php if (!empty($instance['fb_url'])) { ?>
                    <a href="<?php echo esc_url($instance['fb_url']); ?>" target="_blank"><i class="meta-icon ion-social-facebook"></i></a>
                <?php } ?>
                <?php if (!empty($instance['twitter_url'])) { ?>
                    <a href="<?php echo esc_url($instance['twitter_url']); ?>" target="_blank"><i class="meta-icon ion-social-twitter"></i></a>
                <?php } ?>
                <?php if (!empty($instance['insta_url'])) { ?>
                    <a href="<?php echo esc_url($instance['insta_url']); ?>" target="_blank"><i class="meta-icon ion-social-instagram"></i></a>
                <?php } ?>
            </div>

            <div class="author-details">
                <?php if (!empty($instance['author_name'])) { ?>
                    <h3 class="author-name"><?php echo esc_html($instance['author_name']); ?></h3>
                <?php } ?>
                <?php if (!empty($instance['author_desc'])) { ?>
                    <p class="primary-font"><?php echo wp_kses_post($instance['author_desc']); ?></p>
                <?php } ?>
            </div> <!-- /#author-details -->

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
        $title = !empty($instance['title']) ? $instance['title'] : '';
        $author_name = !empty($instance['author_name']) ? $instance['author_name'] : '';
        $author_desc = !empty($instance['author_desc']) ? $instance['author_desc'] : '';
        $author_bg_img = !empty($instance['author_bg_img']) ? $instance['author_bg_img'] : '';
        $author_img = !empty($instance['author_img']) ? $instance['author_img'] : '';
        $fb_url = !empty($instance['fb_url']) ? $instance['fb_url'] : '';
        $twitter_url = !empty($instance['twitter_url']) ? $instance['twitter_url'] : '';
        $insta_url = !empty($instance['insta_url']) ? $instance['insta_url'] : '';
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php esc_attr_e('Title:', 'minimal-lite'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text"
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('author_name')); ?>">
                <?php esc_attr_e('Author Name:', 'minimal-lite'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('author_name')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('author_name')); ?>" type="text"
                   value="<?php echo esc_attr($author_name); ?>">
        </p>
        <div>
            <label for="<?php echo esc_attr( $this->get_field_id( 'author_bg_img' ) ); ?>">
                <?php esc_attr_e('Author Background Image:', 'minimal-lite'); ?>
            </label>
            <!-- <br /> -->
            <input type="button" class="select-img button button-primary" value="<?php esc_attr_e( 'Upload', 'minimal-lite' ); ?>" data-uploader_title="<?php esc_attr_e( 'Select Image', 'minimal-lite' ); ?>" data-uploader_button_text="<?php esc_attr_e( 'Choose Image', 'minimal-lite' ); ?>" />
            <?php
            $image_status = false;
            if ( ! empty( $author_bg_img ) ) {
                $image_status = true;
            }
            $remove_button_style = 'display:none;';
            if ( true === $image_status ) {
                $remove_button_style = 'display:inline-block;';
            }
            ?>
            <input type="button" value="<?php echo _x( 'X', 'Remove', 'minimal-lite' ); ?>" class="button button-secondary btn-image-remove" style="<?php echo esc_attr( $remove_button_style ); ?>" />
            <input type="hidden" class="img" name="<?php echo esc_attr( $this->get_field_name( 'author_bg_img' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'author_bg_img' ) ); ?>" value="<?php echo esc_attr( $author_bg_img ); ?>" />
            <div class="image-preview-wrap">
                <?php if ( ! empty( $author_bg_img ) ) : ?>
                    <img src="<?php echo esc_attr( $author_bg_img ); ?>" alt="" />
                <?php endif; ?>
            </div><!-- .image-preview-wrap -->
        </div>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('author_desc')); ?>">
                <?php esc_attr_e('Short Description:', 'minimal-lite'); ?>
            </label>
            <textarea class="widefat" id="<?php echo esc_attr($this->get_field_id('author_desc')); ?>"
                      name="<?php echo esc_attr($this->get_field_name('author_desc')); ?>"><?php echo esc_textarea($author_desc);?></textarea>
        </p>
        <div>
            <label for="<?php echo esc_attr( $this->get_field_id( 'author_img' ) ); ?>">
                <?php esc_attr_e('Author Image:', 'minimal-lite'); ?>
            </label>
            <!-- <br /> -->
            <input type="button" class="select-img button button-primary" value="<?php esc_attr_e( 'Upload', 'minimal-lite' ); ?>" data-uploader_title="<?php esc_attr_e( 'Select Image', 'minimal-lite' ); ?>" data-uploader_button_text="<?php esc_attr_e( 'Choose Image', 'minimal-lite' ); ?>" />
            <?php
            $image_status = false;
            if ( ! empty( $author_img ) ) {
                $image_status = true;
            }
            $remove_button_style = 'display:none;';
            if ( true === $image_status ) {
                $remove_button_style = 'display:inline-block;';
            }
            ?>
            <input type="button" value="<?php echo _x( 'X', 'Remove', 'minimal-lite' ); ?>" class="button button-secondary btn-image-remove" style="<?php echo esc_attr( $remove_button_style ); ?>" />
            <input type="hidden" class="img" name="<?php echo esc_attr( $this->get_field_name( 'author_img' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'author_img' ) ); ?>" value="<?php echo esc_attr( $author_img ); ?>" />
            <div class="image-preview-wrap">
                <?php if ( ! empty( $author_img ) ) : ?>
                    <img src="<?php echo esc_attr( $author_img ); ?>" alt="" />
                <?php endif; ?>
            </div><!-- .image-preview-wrap -->
        </div>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('fb_url')); ?>">
                <?php esc_attr_e('Facebook URL:', 'minimal-lite'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('fb_url')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('fb_url')); ?>" type="text"
                   value="<?php echo esc_url($fb_url); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('twitter_url')); ?>">
                <?php esc_attr_e('Twitter URL:', 'minimal-lite'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('twitter_url')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('twitter_url')); ?>" type="text"
                   value="<?php echo esc_url($twitter_url); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('insta_url')); ?>">
                <?php esc_attr_e('Instagram URL:', 'minimal-lite'); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('insta_url')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('insta_url')); ?>" type="text"
                   value="<?php echo esc_url($insta_url); ?>">
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

        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['author_name'] = (!empty($new_instance['author_name'])) ? sanitize_text_field($new_instance['author_name']) : '';
        $instance['author_desc'] = (!empty($new_instance['author_desc'])) ? wp_kses_post($new_instance['author_desc']) : '';
        $instance['author_bg_img'] = (!empty($new_instance['author_bg_img'])) ? esc_url_raw($new_instance['author_bg_img']) : '';
        $instance['author_img'] = (!empty($new_instance['author_img'])) ? esc_url_raw($new_instance['author_img']) : '';
        $instance['fb_url'] = (!empty($new_instance['fb_url'])) ? esc_url_raw($new_instance['fb_url']) : '';
        $instance['twitter_url'] = (!empty($new_instance['twitter_url'])) ? esc_url_raw($new_instance['twitter_url']) : '';
        $instance['insta_url'] = (!empty($new_instance['insta_url'])) ? esc_url_raw($new_instance['insta_url']) : '';

        return $instance;
    }

}