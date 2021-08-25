<?php
  require_once(__DIR__ . '/debug-utils.php');

  //TODO: Remove this abomination
  add_filter('rest_category_query', function ($args, $request) {
    if ($args['number'] == 100) {
      $args['number'] = 500;
    }
    return $args;
  }, 10, 2);

  /**
   * Actions to do after custom theme is set up
   */
  add_action('after_setup_theme', function() {
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'main' => __('Main Navigation', 'pedanet'),
      'locale' => __('Localization menu', 'pedanet'),
      'site' => __('Site Navigation', 'pedanet'),
      'quick' => __('Quick Links', 'pedanet'),
      'footer' => __('Footer Navigation', 'pedanet')
    ]);
  });

  /**
   * Registers custom taxonomy
   */
  function register_custom_taxonomy() {
    $labels = [
      'name' => _x('Oppilaitos', 'taxonomy general name'),
      'singular_name' => _x('Oppilaitos', 'taxonomy singular name'),
      'search_items' =>  __('Etsi oppilaitoksia'),
      'popular_items' => __('Suosittuja oppilaitoksia'),
      'all_items' => __('Kaikki oppilaitokset'),
      'parent_item' => null,
      'parent_item_colon' => null,
      'edit_item' => __('Muokkaa oppilaitosta'),
      'update_item' => __('Päivitä oppilaitos'),
      'add_new_item' => __('Lisää uusi oppilaitos'),
      'new_item_name' => __('Uuden oppilaitoksen nimi'),
      'separate_items_with_commas' => __('Erota oppilaitokset pilkulla'),
      'add_or_remove_items' => __('Lisää tai poista oppilaitoksia'),
      'choose_from_most_used' => __('Valitse eniten käytetyistä oppilaitoksista'),
      'menu_name' => __('Oppilaitokset')
    ];
    register_taxonomy('academy', [ 'page', 'post' ], [
      'hierarchical' => true,
      'labels' => $labels,
      'show_ui' => true,
      'show_admin_column' => true,
      'show_in_rest' => true,
      'rest_base' => 'taxonomy/academy',
      'update_count_callback' => '_update_post_term_count',
      'query_var' => true,
      'rewrite' => [ 'slug' => 'academy' ],
      'public' => true
    ]);
  }

  add_action('init', 'register_custom_taxonomy', 0);

  /**
   * Returns given string as URL-friendly
   *
   * @param text text
   */
  function slugify ($text, string $divider = '_') {
    $text = preg_replace('~[^\pL\d]+~u', $divider, $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, $divider);
    $text = preg_replace('~-+~', $divider, $text);
    $text = strtolower($text);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
  }

  /**
   * Assign school terms to saved post based on user roles
   *
   * TODO: Figure out some better way to do this hideous mess!!!
   *
   * @param id post id
   */
  function add_terms_for_post($id) {
    $existingTerms = wp_get_post_terms($id, 'academy');

    if (sizeOf($existingTerms) > 0) {
      return;
    }

    $academies = get_terms('academy', [ 'hide_empty' => false ]);
    $roles = wp_get_current_user()->roles;

    $terms = [];

    foreach ($academies as $academy) {
      $slug = slugify($academy->name);

      if (in_array($slug, $roles)) {
        $terms[] = $academy->name;
      }
    }

    wp_set_object_terms($id, $terms, 'academy');
  }

  add_action('save_post', 'add_terms_for_post');

  require_once(__DIR__ . '/wp-rest-api-endpoints/main-menu.php');
  require_once(__DIR__ . '/wp-rest-api-endpoints/tree-menu.php');
  require_once(__DIR__ . '/wp-rest-api-endpoints/post-thumbnail.php');

  /**
   * Filter for service location channel components of SPTV plugin
   */
  add_filter('sptv_service_location_service_channel_components', function ($templates) {
    $templates[] = [
      'slug' => 'accessibility',
      'name' => __('Esteettömyystiedot', 'sptv')
    ];

    $templates[] = [
      'slug' => 'contact-info',
      'name' => __('Yhteystiedot - sivupaneeli', 'sptv')
    ];

    return $templates;
  });
?>
