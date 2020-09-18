<?php
  
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'main' => __('Main Navigation', "pedanet"),
      'locale' => __('Localization menu', "pedanet"),
      'site' => __('Site Navigation', "pedanet"),
      'quick' => __('Quick Links', "pedanet"),
      'footer' => __('Footer Navigation', "pedanet")
    ]);
  });

  /**
   * Registers custom taxonomy
   */
  function register_custom_taxonomy() {
    $labels = array(
      'name' => _x( 'Oppilaitos', 'taxonomy general name' ),
      'singular_name' => _x( 'Oppilaitos', 'taxonomy singular name' ),
      'search_items' =>  __( 'Etsi oppilaitoksia' ),
      'popular_items' => __( 'Suosittuja oppilaitoksia' ),
      'all_items' => __( 'Kaikki oppilaitokset' ),
      'parent_item' => null,
      'parent_item_colon' => null,
      'edit_item' => __( 'Muokkaa oppilaitosta' ), 
      'update_item' => __( 'Päivitä oppilaitos' ),
      'add_new_item' => __( 'Lisää uusi oppilaitos' ),
      'new_item_name' => __( 'Uuden oppilaitoksen nimi' ),
      'separate_items_with_commas' => __( 'Erota oppilaitokset pilkulla' ),
      'add_or_remove_items' => __( 'Lisää tai poista oppilaitoksia' ),
      'choose_from_most_used' => __( 'Valitse eniten käytetyistä oppilaitoksista' ),
      'menu_name' => __( 'Oppilaitokset' )
    ); 
    register_taxonomy('academy',array('page', 'post'),array(
      'hierarchical' => true,
      'labels' => $labels,
      'show_ui' => true,
      'show_admin_column' => true,
      'show_in_rest' => true,
      'rest_base' => 'taxonomy/academy',
      'update_count_callback' => '_update_post_term_count',
      'query_var' => true,
      'rewrite' => array( 'slug' => 'academy' ),
      'public' => true
    ));
  }
  add_action( 'init', 'register_custom_taxonomy', 0 );

  /**
   * Adds school identifier to page
   * 
   * @param id post id
   */
  function add_terms_for_post($id) {
    $terms = get_terms('academy', array(
      'hide_empty' => false
    ));
    foreach ($terms as $term) {
      if (in_array($term->name, wp_get_current_user()->roles)) {
        wp_set_object_terms($id, array($term->name), 'academy');
      }
    }
  }
  add_action('save_post', 'add_terms_for_post');

  require_once(__DIR__ . "/wp-rest-api-endpoints/main-menu.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/tree-menu.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/post-thumbnail.php");

  add_filter("sptv_service_location_service_channel_components", function ($templates) {
    $templates[] = [
      "slug" => "accessibility",
      "name" => __("Esteettömyystiedot", "sptv")
    ];
    
    return $templates;
  });
?>