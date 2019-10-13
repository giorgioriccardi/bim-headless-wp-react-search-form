<?php
global $post;
$address = get_post_meta($post->ID, 'address', true);
$city = get_post_meta($post->ID, 'city', true);
$country = get_post_meta($post->ID, 'country', true);
$country_short_name = get_post_meta($post->ID, 'country_short_name', true);
$state = get_post_meta($post->ID, 'state', true);
$state_short_name = get_post_meta($post->ID, 'state_short_name', true);
$zipcode = get_post_meta($post->ID, 'zipcode', true);
$latitude = get_post_meta($post->ID, 'latitude', true);
$longitude = get_post_meta($post->ID, 'longitude', true);
?>
<div id="reactive-geobox">
  <p>
    <label><?php esc_html_e('Type location', 'reactive') ?></label>
    <input id="pac-input" name="address" class="widefat" type="text"
    placeholder="Enter a location" value="<?php echo $address ?>" />
  </p>

  <table id="address">
    <tr>
      <td class="label"><?php esc_html_e('City', 'reactive') ?></td>
      <td class="slimField">
        <input class="field" name="city" id="city" value="<?php echo $city ?>" />
      </td>
    </tr>
    <tr>
      <td class="label"><?php esc_html_e('Country', 'reactive') ?></td>
      <td class="slimField">
        <input class="field" name="country" id="country" value="<?php echo $country ?>" />
      </td>
      <td class="wideField" colspan="2">
        <input class="field" name="country_short_name" id="country_short_name" value="<?php echo $country_short_name ?>" />
      </td>
    </tr>
    <tr>
      <td class="label"><?php esc_html_e('State', 'reactive') ?></td>
      <td class="slimField">
        <input class="field" name="state" id="state" value="<?php echo $state ?>" /></td>
      <td class="wideField">
        <input class="field" name="state_short_name" id="state_short_name" value="<?php echo $state_short_name ?>" />
      </td>
    </tr>
    <tr>
      <td class="label"><?php esc_html_e('Zip code', 'reactive') ?></td>
      <td class="slimField">
        <input class="field" name="zipcode" id="zipcode" value="<?php echo $zipcode ?>" />
      </td>
    </tr>
    <tr>
      <td class="label"><?php esc_html_e('Latitude', 'reactive') ?></td>
      <td class="wideField" colspan="3">
        <input class="field" name="latitude" id="latitude" value="<?php echo $latitude ?>" />
      </td>
    </tr>
    <tr>
      <td class="label"><?php esc_html_e('Longitude', 'reactive') ?></td>
      <td class="wideField" colspan="3">
        <input class="field" name="longitude" id="longitude" value="<?php echo $longitude ?>" />
      </td>
    </tr>
  </table>

  <div id="map" style="margin-top:30px; height: 400px;"></div>
</div>