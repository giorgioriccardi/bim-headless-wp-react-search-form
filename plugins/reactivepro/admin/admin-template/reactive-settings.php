<?php

// if this fails, check_admin_referer() will automatically print a "failed" page and die.
if ( ! empty( $_POST ) && check_admin_referer( 'nonce_reactive_settings', 'reactive_settings' ) ) {
  $posted = $_POST;
  unset($posted['submit']);
  unset($posted['reactive_settings']);
  unset($posted['_wp_http_referer']);
  update_option('reactive_settings', $posted);
}


$reactive_settings = get_option('reactive_settings', true);
$all_post_types = get_post_types( array() , 'names', 'and' );

$selected_post_types = ( isset( $reactive_settings['geobox'] ) && !empty( $reactive_settings['geobox'] )) ? $reactive_settings['geobox'] : array();
?>
<style type="text/css">
  #reactive-settings {
  background: #fff;
  padding: 50px;
  border-top: 3px solid #7e57c2;
}

.reactive-settings-h1{
  font-weight: bold;
  font-size: 28px;
}

</style>
<div id="reactive-settings" class="wrap">
  <h1 class="reactive-settings-h1"><?php esc_html_e('Reactive Settings', 'reactive') ?></h1>
  <form method="post">
    <table class="form-table reactive-admin-settings-from">
      <tbody>
        <tr>
          <th scope="row"><?php esc_html_e('Google Map API Key', 'reactive') ?></th>
          <td>
            <input type="text" class="widefat" name="gmap_api_key" value="<?php echo ( isset( $reactive_settings['gmap_api_key'] ) && !empty( $reactive_settings['gmap_api_key'] ) ) ? $reactive_settings['gmap_api_key'] : ''; ?>">
          </td>
        </tr>
        <!-- <tr>
          <th scope="row"><?php // esc_html_e('Mapbox Token', 'reactive') ?></th>
          <td>
            <input type="text" class="widefat" name="mapbox_token" value="<?php // echo ( isset( $reactive_settings['mapbox_token'] ) && !empty( $reactive_settings['mapbox_token'] ) ) ? $reactive_settings['mapbox_token'] : ''; ?>">
          </td>
        </tr> -->
        <tr>
          <th scope="row"><?php esc_html_e('Map Country Region', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_map_country_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_map_country_switch'])) echo ($reactive_settings['reactive_map_country_switch'] == 'true' ? 'selected="selected"' : '') ?>>Rest Of the World</option>
              <option value="china" <?php if(isset($reactive_settings['reactive_map_country_switch'])) echo ($reactive_settings['reactive_map_country_switch'] == 'china' ? 'selected="selected"' : '') ?>>China</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Turn Off Google Map', 'reactive') ?></th>
          <td>
            <input type="checkbox" class="widefat" name="google_map_switch" value="<?php echo ( isset( $reactive_settings['google_map_switch'] ) && !empty( $reactive_settings['google_map_switch'] ) ) ? 'checked' : 'false'; ?>" <?php echo ( isset( $reactive_settings['google_map_switch'] ) && !empty( $reactive_settings['google_map_switch'] ) ) ? 'checked' : 'false'; ?>>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load Bootstrap Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="bootstrap_load_scripts" value="<?php echo ( isset( $reactive_settings['bootstrap_load_scripts'] ) && !empty( $reactive_settings['bootstrap_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['bootstrap_load_scripts'] ) && !empty( $reactive_settings['bootstrap_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Bootstrap Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_bootstrap_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_bootstrap_switch'])) echo ($reactive_settings['reactive_bootstrap_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_bootstrap_switch'])) echo ($reactive_settings['reactive_bootstrap_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load FontAwesome Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="fontawesome_load_scripts" value="<?php echo ( isset( $reactive_settings['fontawesome_load_scripts'] ) && !empty( $reactive_settings['fontawesome_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['fontawesome_load_scripts'] ) && !empty( $reactive_settings['fontawesome_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        <tr>
        <tr>
          <th scope="row"><?php esc_html_e('Font Awesome Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_fontawesome_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_fontawesome_switch'])) echo ($reactive_settings['reactive_fontawesome_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_fontawesome_switch'])) echo ($reactive_settings['reactive_fontawesome_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load Jquery UI Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="jqueryui_load_scripts" value="<?php echo ( isset( $reactive_settings['jqueryui_load_scripts'] ) && !empty( $reactive_settings['jqueryui_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['jqueryui_load_scripts'] ) && !empty( $reactive_settings['jqueryui_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Jquery UI CSS Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_jquery_ui_css_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_jquery_ui_css_switch'])) echo ($reactive_settings['reactive_jquery_ui_css_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_jquery_ui_css_switch'])) echo ($reactive_settings['reactive_jquery_ui_css_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load Isotope Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="isotope_load_scripts" value="<?php echo ( isset( $reactive_settings['isotope_load_scripts'] ) && !empty( $reactive_settings['isotope_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['isotope_load_scripts'] ) && !empty( $reactive_settings['isotope_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Isotope Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_isotope_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_isotope_switch'])) echo ($reactive_settings['reactive_isotope_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_isotope_switch'])) echo ($reactive_settings['reactive_isotope_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load Ion Range Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="ionrange_load_scripts" value="<?php echo ( isset( $reactive_settings['ionrange_load_scripts'] ) && !empty( $reactive_settings['ionrange_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['ionrange_load_scripts'] ) && !empty( $reactive_settings['ionrange_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Ion Range Slider Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_ion_range_slider_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_ion_range_slider_switch'])) echo ($reactive_settings['reactive_ion_range_slider_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_ion_range_slider_switch'])) echo ($reactive_settings['reactive_ion_range_slider_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Load Magnefic Popup Scripts From', 'reactive') ?></th>
          <td>
            <label style="font-style: italic; padding-right: 15px">CDN</label>
            <label class="rq-toggle-switch-admin" style="position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
              background:#2196F3;
            ">
              <input type="checkbox" style="display:none;" name="magnefic_popup_load_scripts" value="<?php echo ( isset( $reactive_settings['magnefic_popup_load_scripts'] ) && !empty( $reactive_settings['magnefic_popup_load_scripts'] ) ) ? 'true' : 'false'; ?>" <?php echo ( isset( $reactive_settings['magnefic_popup_load_scripts'] ) && !empty( $reactive_settings['magnefic_popup_load_scripts'] ) ) ? 'checked' : 'false'; ?>>
              <div class="rq-toggle-slider-admin"></div>
            </label>
            <label style="font-style: italic; padding-left: 15px">Local Library</label>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Magnefic Popup Enable Disable Option', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="reactive_magnefic_popup_switch">
              <option value="true" <?php if(isset($reactive_settings['reactive_magnefic_popup_switch'])) echo ($reactive_settings['reactive_magnefic_popup_switch'] == 'true' ? 'selected="selected"' : '') ?>>Enable</option>
              <option value="false" <?php if(isset($reactive_settings['reactive_magnefic_popup_switch'])) echo ($reactive_settings['reactive_magnefic_popup_switch'] == 'false' ? 'selected="selected"' : '') ?>>Disable</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Geobox Enable', 'reactive') ?></th>
          <td>
            <select class="geobox-allowed" name="geobox[]" multiple="multiple">
              <?php foreach ($all_post_types as $post) : ?>
              <option value="<?php echo $post ?>" <?php echo (in_array($post, $selected_post_types)) ? 'selected="selected"' : '' ?>><?php echo $post ?></option>
              <?php endforeach; ?>
            </select>
          </td>
        </tr>

        <tr>
          <th scope="row"><?php esc_html_e('Turn off Indexing Cron', 'reactive') ?></th>
          <td>
            <input type="checkbox" class="widefat" name="reactive_indexing_cron" value="<?php echo ( isset( $reactive_settings['reactive_indexing_cron'] ) && !empty( $reactive_settings['reactive_indexing_cron'] ) ) ? 'checked' : 'false'; ?>" <?php echo ( isset( $reactive_settings['reactive_indexing_cron'] ) && !empty( $reactive_settings['reactive_indexing_cron'] ) ) ? 'checked' : 'false'; ?>>
          </td>
        </tr>
        <tr>
          <th scope="row"><?php esc_html_e('Cron Schedule (min)', 'reactive') ?></th>
          <td>
            <input type="number" min="1" class="widefat" name="reactive_indexing_cron_time" value="<?php echo ( isset( $reactive_settings['reactive_indexing_cron_time'] ) && !empty( $reactive_settings['reactive_indexing_cron_time'] ) ) ? $reactive_settings['reactive_indexing_cron_time'] : '5'; ?>">
          </td>
        </tr>
      </tbody>
    </table>

    <?php wp_nonce_field( 'nonce_reactive_settings', 'reactive_settings' ); ?>
    <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e("Save Changes", 'reactive') ?>"></p>
  </form>
</div>
