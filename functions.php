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
      'name' => _x( 'Schools', 'taxonomy general name' ),
      'singular_name' => _x( 'School', 'taxonomy singular name' ),
      'search_items' =>  __( 'Search Schools' ),
      'popular_items' => __( 'Popular Schools' ),
      'all_items' => __( 'All Schools' ),
      'parent_item' => null,
      'parent_item_colon' => null,
      'edit_item' => __( 'Edit School' ), 
      'update_item' => __( 'Update School' ),
      'add_new_item' => __( 'Add New School' ),
      'new_item_name' => __( 'New School Name' ),
      'separate_items_with_commas' => __( 'Separate Schools with commas' ),
      'add_or_remove_items' => __( 'Add or remove schools' ),
      'choose_from_most_used' => __( 'Choose from the most used schools' ),
      'menu_name' => __( 'Schools' ),
    ); 
    register_taxonomy('schools','page',array(
      'hierarchical' => true,
      'labels' => $labels,
      'show_ui' => true,
      'show_admin_column' => true,
      'show_in_rest' => true,
      'rest_base' => 'taxonomy/schools',
      'update_count_callback' => '_update_post_term_count',
      'query_var' => true,
      'rewrite' => array( 'slug' => 'school' ),
      'public' => true
    ));
    wp_insert_term( "Koulu1", "schools", array('slug' => 'koulu1'));
    wp_insert_term( "Koulu2", "schools", array('slug' => 'koulu2'));
  }
  add_action( 'init', 'register_custom_taxonomy', 0 );

  /**
   * Adds school identifier to page
   * 
   * @param id post id
   */
  function add_school_for_page($id) {
    $terms = get_terms('schools');
    foreach ($terms as $term) {
      if (wp_get_current_user()->roles[0] === $term->name) {
        wp_set_object_terms($id, wp_get_current_user()->roles[0], "schools");
      }
    }
  }
  add_action('save_post', 'add_school_for_page');
?>