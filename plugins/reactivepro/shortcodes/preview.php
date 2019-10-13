<?php
$editMode = 'user';
if (isset($_POST['editMode']) ) {
  $editMode = $_POST['editMode'];
}
$builderpost = get_post($key);
if (isset($builderpost->ID)):
  $is_admin = 'false';
  if (current_user_can('editor') || current_user_can('administrator') ) {
    $is_admin = 'true';
  }
  $wpml_lang = '';
  include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
  if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
    //plugin is activated
    $wpml_lang = ICL_LANGUAGE_CODE;
  }
$editMode = $is_admin === 'true' ? 'admin' : 'user';
if (isset($_POST['editMode']) && $_POST['editMode']) {
  $editMode = $_POST['editMode'];
}
  if ($is_admin === 'true') {
?>
  <div class="reactivePreviewBtns" >
    <form method="post">
      <button type="submit" name="editMode" value="admin"
      class="reactiveAdminBtn <?php if($editMode === 'admin') echo 'active'; ?>">Admin View</button>
      <button type="submit" name="editMode" value="user"
      class="reactiveUserBtn <?php if($editMode === 'user') echo 'active'; ?>">User View</button>
    </form>
  </div>
<?php
  }
?>
<div id="reactive-root" data-key="<?php echo $key; ?>" style="margin-bottom: 100px;"></div>

  <?php
  $builderdata = json_decode(get_post_meta($key, '_reactive_rebuilder_settings', true));
  if($wpml_lang === '') {
    $reactivedata = get_post_meta($key, 'reactivedata', true);
  } else {
    $reactivedata = get_post_meta($key, 'reactivedata_' . $wpml_lang, true);
    if ( $reactivedata === '') {
      $reactivedata = get_post_meta($key, 'reactivedata', true);
      update_post_meta($key, 'reactivedata_' . $wpml_lang, $reactivedata);
    }
  }
  $graph = new Reactive\App\Graph();
  $enqueue_scripts = new Reactive\App\EnqueueScripts();
  $enqueue_scripts->enqueue_all_scripts();

  $widget_area_object = $GLOBALS['wp_registered_sidebars'];
  $widget_areas = [];
  $metakeys = [];
  $fromated_post_types = [];
  $term_meta_keys = [];
  $taxonomies = [];
  $post_types = [];
  $redirectPages = [];
  $selected_template = get_option('reactive_selected_template');
  $sorting_attributes = [];
  $serialized_meta_keys = [];
  $fetch_user = 'false';
  $all_users = 'false';
  $all_users = 'false';
  $all_term_names = [];
  $all_terms = [];
  $post_to_terms = [];
  $taxonomy_to_terms = [];
  $term_meta_to_terms = [];
  $term_to_term = [];
  $search_restricted_terms = [];
  $search_type = 'post_type';
  $grid_all_data = array(
    'allPosts' => [],
    'allAttachmentsUrl' => []
  );
  $skip_post_content = 'false';
  foreach ($widget_area_object as $key => $single_widget_area) {
    $widget_areas[$key] = $single_widget_area['name'];
  }
  if (isset($builderdata->rebuilder_search_type)) {
    $search_type = $builderdata->rebuilder_search_type;
  }
  if (isset($builderdata->rebuilder_meta_keys_select)) {
    $metakeys = explode(',', $builderdata->rebuilder_meta_keys_select);
  }
  if (isset($builderdata->serialized_meta_keys)) {
    $serialized_meta_keys = explode(',', $builderdata->serialized_meta_keys);
  }
  if (isset($builderdata->rebuilder_sorting_attribute_select)) {
    $sorting_attributes = explode(',', $builderdata->rebuilder_sorting_attribute_select);
  }
  if (isset($builderdata->user_data)) {
    $fetch_user = $builderdata->user_data;
  }
  if(!in_array('lat', $metakeys)) {
    array_push($metakeys, 'lat');
  }
  if(!in_array('lng', $metakeys)) {
    array_push($metakeys, 'lng');
  }
  if (isset($builderdata->rebuilder_redirect_page_select)) {
    $redirectPages = explode(',', $builderdata->rebuilder_redirect_page_select);
  }
  if (isset($builderdata->skip_post_content)) {
    $skip_post_content = $builderdata->skip_post_content;
  }
  switch ($search_type) {
    case 'user':
      $sorted_data_array = $graph->process_user_sorting_data($sorting_attributes);
      $meta_to_post = $graph->get_meta_to_user($metakeys, $wpml_lang, $serialized_meta_keys);
      $grid_all_data = $graph->get_user_grid_data($wpml_lang);
      break;
    case 'review':
      $meta_to_post = $graph->get_meta_to_review($metakeys, $wpml_lang, $serialized_meta_keys);
      $sorted_data_array = $graph->process_review_sorting_data($sorting_attributes);
      if (isset($builderdata->rebuilder_post_type_select)) {
        $post_types = explode(',', $builderdata->rebuilder_post_type_select);
        $fromated_post_types = [];
        foreach ($post_types as $key => $single_post_type) {
          $post_type_obj = get_post_type_object($single_post_type);
          $fromated_post_types[$post_type_obj->name] = $post_type_obj->labels->singular_name;
        }
      }
      // $grid_all_post_data = $graph->get_get_grid_all_data($post_types, $wpml_lang);
      $grid_all_data = $graph->get_review_grid_data($wpml_lang, $post_types);
      // $grid_all_data['allPosts'] = array_merge($grid_all_review_data['allPosts'], $grid_all_post_data['allPosts']);
      // $grid_all_data['allAttachmentsUrl'] = array_merge($grid_all_review_data['allAttachmentsUrl'], $grid_all_post_data['allAttachmentsUrl']);
      break;
    case 'bp_group':
      $meta_to_post = $graph->get_meta_to_bp_group($metakeys, $wpml_lang, $serialized_meta_keys);
      $sorted_data_array = $graph->process_bp_group_sorting_data($sorting_attributes);
      $grid_all_data = $graph->get_bp_group_grid_data($wpml_lang);
      break;
    case 'bp_activity':
      $sorted_data_array = $graph->process_bp_activity_sorting_data($sorting_attributes);
      $meta_to_post = $graph->get_meta_to_bp_activity($metakeys, $wpml_lang, $serialized_meta_keys);
      $grid_all_data = $graph->get_bp_activity_grid_data($wpml_lang);
      break;

    default:
      if (isset($builderdata->rebuilder_post_type_select)) {
        $post_types = explode(',', $builderdata->rebuilder_post_type_select);
        $fromated_post_types = [];
        foreach ($post_types as $key => $single_post_type) {
          $post_type_obj = get_post_type_object($single_post_type);
          $fromated_post_types[$post_type_obj->name] = $post_type_obj->labels->singular_name;
        }
      }
      if (isset($builderdata->search_restricted_terms)) {
        $search_restricted_terms = explode(',', $builderdata->search_restricted_terms);
      }
      if (isset($builderdata->rebuilder_taxonomy_select)) {
        $taxonomies = explode(',', $builderdata->rebuilder_taxonomy_select);
      }
      if (isset($builderdata->rebuilder_term_meta_select)) {
        $term_meta_keys = explode(',', $builderdata->rebuilder_term_meta_select);
      }
      $all_term_names = $graph->get_term_names($wpml_lang, $search_restricted_terms, $taxonomies);
      $sorted_data_array = $graph->process_sorting_data($post_types, $sorting_attributes);
      $all_terms = $graph->get_all_terms($taxonomies, $post_types, $wpml_lang, $search_restricted_terms);
      $post_to_terms = $graph->get_post_to_terms($post_types, $taxonomies, $wpml_lang, $search_restricted_terms);
      $taxonomy_to_terms = $graph->get_taxonomy_to_term($taxonomies, $post_types, $wpml_lang, $search_restricted_terms);
      $term_meta_to_terms = $graph->get_term_meta_to_term($term_meta_keys);
      $term_to_term = $graph->get_term_to_term($taxonomies, $post_types, $wpml_lang, $search_restricted_terms);
      $meta_to_post = $graph->get_meta_to_post($metakeys, $wpml_lang, $post_types, $serialized_meta_keys);
      $grid_all_data = $graph->get_grid_all_data($post_types, $wpml_lang, $skip_post_content);
      break;
  }

  // $grid_all_data = $graph->get_get_grid_all_data($post_types, $wpml_lang);

  // category page data
  $category_data = array();
  $category_page = sanitize_post( $GLOBALS['wp_the_query']->get_queried_object() );
  if( isset($category_page->taxonomy) && !empty($category_page->taxonomy)) {
    $category_data = $category_page;
    $category_data->parents = array();
    $parent = get_ancestors($category_data->term_id, $category_data->taxonomy);
    if (!empty($parent)) {
      foreach ($parent as $key => $parent_id) {
        $category_info = get_category($parent_id);
        array_push($category_data->parents, $category_info);
      }
    }
  } else {
    $category_data = null;
  }

  $current_user = wp_get_current_user();


  $alldata = array_merge($reactivedata ? json_decode(json_encode($reactivedata), true) : array(), array(
    'taxonomies'          => $taxonomies,
    'metakeys'            => $metakeys,
    'termMetaKeys'        => $term_meta_keys,
    'sortingAttributes'   => $sorting_attributes,
    'allPostTypes'        => $fromated_post_types,
    // 'allPosts'       => $graph->allPosts($post_types, $wpml_lang),
    'allPosts'            => $grid_all_data['allPosts'],
    'allterms'            => $all_terms,
    'termToTerm'          => $term_to_term,
    // 'termToPost'     => $graph->get_term_to_post($taxonomies, $post_types, $wpml_lang),
    'postToTerms'         => $post_to_terms,
    'metaToPost'          => $meta_to_post,
    'taxonomyToTerm'      => $taxonomy_to_terms,
    'allTermNames'        => $all_term_names,
    'termMetaToTerms'     => $term_meta_to_terms,
    'taxonomyNames'       => get_taxonomy_names($taxonomies),
    'widgetsAreas'        => $widget_areas,
    'protocol'            => is_ssl() == true ? 'https' : 'http',
    'is_admin'            => $is_admin,
    'current_user'        => $current_user,
    'editMode'            => $editMode,
    'site_url'            => site_url(),
    'multi_lang'          => $wpml_lang,
    'page_url'            => get_permalink(),
    'redirectPages'       => $redirectPages,
    // 'gridAllData'  => $graph->get_get_grid_all_data($post_types),
    'allAttachmentsUrl'   => $grid_all_data['allAttachmentsUrl'],
    'attachmentDir'       => $graph->get_attachment_dir_url(),
    'permalinkStructure'  => $graph->get_permalink_structure($post_types),
    'allTemplates'        => gridLeftSearchRight(),
    'selected_template'   => $selected_template,
    'sortedData'          => $sorted_data_array,
    'allUsers'            => $fetch_user == 'true' ? $graph->get_all_users() : [],
    'categoryData'        => $category_data,
    'searchType'          => $search_type,
    'adminAjax'           => admin_url( 'admin-ajax.php' ),

  ));
  if ( is_plugin_active( 'woocommerce-rental-and-booking/redq-rental-and-bookings.php' ) ) {
    $rental_data = $graph->get_rental_product_data();
    $alldata ['rentalData'] = $rental_data;
  }
  wp_localize_script( 're_base', 'REACTIVE', $alldata);

  if ($editMode === 'admin' && $is_admin === 'true') {
    wp_localize_script( 're_base', 'REACTIVE', $alldata);
  } else {
    wp_localize_script( 're_preview', 'REACTIVE', $alldata);
  }
  ?>

  <div id="reactiveqgridtemplates">
    <?php do_action('reactive_preview_template') ?>
  </div>
  <div id="reactiveqcategorytemplates">
    <?php do_action('reactive_category_preview_template') ?>
  </div>
  <div id="reactiveqmapicontemplates">
    <?php do_action('reactive_map_icon_preview_template') ?>
  </div>
  <div id="reactiveqmapinfotemplates">
    <?php do_action('reactive_map_info_preview_template') ?>
  </div>
  <div id="reactiveqpreviewpopuptemplates">
    <?php do_action('reactive_preview_popup_template') ?>
  </div>
  <div id="reactiveautosearchtemplates">
    <?php do_action('reactive_autocomplete_search_template') ?>
  </div>
<?php
else:
  echo '<h3>Please use reactive builder and valid key</h3>';
  wp_localize_script( 're_base', 'REACTIVE', array());
endif;
