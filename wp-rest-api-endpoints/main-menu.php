<?php

function register_main_menu_endpoint() {
  register_rest_route('wp/v2', '/mainMenu', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      return get_main_menu_pages_with_links();
    },
  ));
}
add_action('rest_api_init', 'register_main_menu_endpoint');

function get_main_menu_pages_with_links() {
  $menu_items = array();
  $pages = get_pages(
    array(
      'post_type' => 'page',
      'sort_column' => 'menu_order'
    )
  );

  $filtered_pages = array_filter($pages, function ($page) {
    if ($page->{'post_parent'} > 0) {
      return false;
    }
    return true;
  });

  usort($filtered_pages, function($a, $b) {
    return $a->{'menu_order'} > $b->{'menu_order'};
  });

  foreach($filtered_pages as $page) {
    array_push(
      $menu_items,
      array(
        'title' => $page->{'post_title'},
        'link' => get_page_link($page->ID)
      )
    );
  }

  return $menu_items;
}

?>