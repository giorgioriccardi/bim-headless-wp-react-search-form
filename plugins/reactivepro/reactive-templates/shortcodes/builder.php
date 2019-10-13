<?php
  global $post;
  $data_builder = new Reactive\App\Re_Data_Provider();

  if( isset($key) && $key != '' ) {
    $build_post = get_post($key);
    if (empty($build_post) ) {
      _e('Please build your shortcode from reactive builder', 'reactive');
    } else {
      if ($build_post->post_type === 'rebuilder') {
        $builder_post_type = get_post_meta( $key, 'rebuilder_post_type', true );
        $is_ajax = get_post_meta( $key, 'rebuilder_async', true ) === 'ajax' ? 'true': 'false';
        $transient_value = get_transient('reactive_builder-'.$builder_post_type);
        $origin_metakey = '_reactive_builder_'.$key;
        $numberOfPosts = '10';

        $id = 'reactive-gsb-'.$key;
        $allKeys = get_post_custom_keys($post->ID);
        $allBuilderData = array();
        $allBuilderData[$origin_metakey] = array();
        $allBuilderData[$origin_metakey] = $transient_value;
        $allBuilderData[$origin_metakey]['settingsData'] = array(
          'post_type' => $builder_post_type,
          'ajax' => $is_ajax,
          'theme' => 'reactive',
        );

        foreach ($allKeys as $metakey ) {
          if(preg_match('/^_reactive_settings_/', $metakey) && strpos($metakey, $key) ) {
            $settingsData = get_post_meta($post->ID, $metakey, true);
            if (!is_array($settingsData)) {
              $settingsData = array();
            }
            if (is_array($allBuilderData[$origin_metakey]['settingsData'])) {
              $allBuilderData[$origin_metakey]['settingsData'] = array_merge(
                $settingsData, $allBuilderData[$origin_metakey]['settingsData']);
            }
          }
        }

        $metadata = array();
        foreach ($allKeys as $metakey ) {
          if(preg_match('/^_reactive_builder_/', $metakey) && strpos($metakey, $key) )
          {
            $allLayout = get_post_meta($post->ID, $metakey, true);
            $allBuilderData[$metakey]['layoutData'] = $allLayout;
            foreach ($allLayout as $layout) {
              if( isset($layout['searchAttr']) && !empty($layout['searchAttr']) ) {
                foreach ($layout['searchAttr'] as $search) {
                  if( isset($search['selectedMetakey']) ){
                    $search_metakey = $search['selectedMetakey'];
                    $metadata[$search_metakey] = $data_builder->get_meta_values($search_metakey, $builder_post_type);
                  }
                }
              }
            }

            foreach ($allLayout as $block) {
              if(isset($block['numberOfPosts']) ) {
                $numberOfPosts = isset($block['numberOfPosts']) ? $block['numberOfPosts'] : '10';
              }
            }
          if (is_array($allBuilderData[$metakey]['helperData'])) {
            $allBuilderData[$metakey]['helperData'] = array_merge(
              $allBuilderData[$metakey]['helperData'],
              array('metadata' => $metadata ));
            }
          }
        }

        if ($is_ajax === 'true') {
          $allBuilderData[$metakey]['previewData'] = $data_builder->get_filtered_posts( $builder_post_type, $numberOfPosts, array(), array(), 1, array(), $is_ajax );
        }


      /**
       *
       * Get all builder data;
       * @return Array();
       */
      $allBuilderData = apply_filters('re_all_builder_data', $allBuilderData);


        wp_localize_script( 're-frontend', 'REBUILDER', $allBuilderData );
?>
      <div id="ajax-loader" style="display: none;">
        <img src="<?php echo RE_IMG."loader.png" ?>" />
      </div>
      <div class="reactive-gsb flex-container-fluid"
        data-id="<?php echo esc_attr($id); ?>"
        data-key="<?php echo esc_attr($key); ?>">
      </div>
<?php
      } else {
        _e('Please build your shortcode from reactive builder', 'reactive');
      } // `rebuilder` post type check
    } // not valid key
  } else{
  _e('Please build your shortcode from reactive builder', 'reactive');
  }
