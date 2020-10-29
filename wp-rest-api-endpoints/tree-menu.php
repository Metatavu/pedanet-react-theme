<?php

function register_tree_menu_endpoint() {
  register_rest_route('wp/v2', '/treeMenu', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $academicPageIds = list_page_ids_by_taxonomy('academy');
      $slug = $request->get_param('slug');
      $page = page_by_slug($slug);
      $isAcademyPage = is_academic_page($page->ID, $academicPageIds);
      $mainPage = get_main_page($page, $isAcademyPage, $academicPageIds);
      $initial_open_nodes = get_initial_open_nodes($page, $isAcademyPage, $academicPageIds);
      $treeData = build_tree($mainPage, $page, $isAcademyPage, $academicPageIds);
      return array(
        'treeData' => $treeData,
        'initialOpenNodes' => $initial_open_nodes
      );
    },
  ));
}
add_action('rest_api_init', 'register_tree_menu_endpoint');

function page_by_slug($slug) {
  $pages = get_posts(
    array(
      'name' => $slug,
      'post_type' => 'page'
    )
  );
  if (count($pages) === 0) {
    return;
  }
  return $pages[0];
}

function list_page_ids_by_taxonomy($taxonomyName) {
  $terms = get_terms( array(
    'taxonomy' => $taxonomyName,
    'hide_empty' => false,
  ) );
  $term_ids = wp_list_pluck( $terms, 'term_id' );
  return get_posts(
    array(
    'posts_per_page' => -1,
    'fields' => 'ids',
    'post_type' => 'page',
    'tax_query' => array(
        array(
            'taxonomy' => $taxonomyName,
            'field' => 'term_id',
            'terms' => $term_ids
        )
    )
  ));
}

function is_academic_page($pageId, $academicPageIds) {
  return array_search($pageId, $academicPageIds) ? true : false;
}

function get_main_page($page, $isAcademyPage, $academicPageIds) {
  if ($isAcademyPage) {
    $current = $page;
    $parentIsAcademyPage = $isAcademyPage;
    while (wp_get_post_parent_id($current)) {
      $parentId = wp_get_post_parent_id($current);
      $parent = get_post($parentId);
      $parentIsAcademyPage = is_academic_page($parentId, $academicPageIds);
      if (!$parentIsAcademyPage) {
        break;
      }
      $current = $parent;
    }
    return $current;
  } else {
    $current = $page;
    while (wp_get_post_parent_id($current)) {
      $parentId = wp_get_post_parent_id($current);
      $current = get_post($parentId);
    }
    return $current;
  }
}

function get_initial_open_nodes($page, $isAcademyPage, $academicPageIds) {
  $initial_open_nodes = array("$page->ID");
  if ($isAcademyPage) {
    $current = $page;
    $parentIsAcademyPage = $isAcademyPage;
    $parentId = wp_get_post_parent_id($current);
    while ($parentId) {
      $parent = get_post($parentId);
      $parentIsAcademyPage = is_academic_page($parent, $academicPageIds);
      if (!$parentIsAcademyPage) {
        break;
      }
      $current = $parent;
      $parentId = wp_get_post_parent_id($current);
      if ($parentId && is_academic_page($parentId, $academicPageIds)) {
        $id = "$current->ID";
        for ($i = 0; $i < count($initial_open_nodes); $i++) {
          $initial_open_nodes[$i] = "$id/" . $initial_open_nodes[$i];
        }
        array_unshift($initial_open_nodes, $id);
      }
    }
  } else {
    $current = $page;
    $parentId = wp_get_post_parent_id($current);
    while ($parentId) {
      $current = get_post($parentId);
      $parentId = wp_get_post_parent_id($current);
      if ($parentId) {
        $id = "$current->ID";
        for ($i = 0; $i < count($initial_open_nodes); $i++) {
          $initial_open_nodes[$i] = "$id/" . $initial_open_nodes[$i];
        }
        array_unshift($initial_open_nodes, $id);
      }
    }
  }
  return $initial_open_nodes;
}

function build_tree($mainPage, $page, $isAcademyPage, $academicPageIds) {
  $all_pages = get_pages(array('child_of' => $mainPage->ID));
  return build_tree_layer($mainPage->ID, $page->ID, $all_pages, $isAcademyPage, $academicPageIds);
}

function build_tree_layer($parentId, $currentPageId, $all_pages, $isAcademyPage, $academicPageIds) {
  $tree_nodes = array();
  foreach($all_pages as $page) {
    $renderChildren = is_academic_page($page->ID, $academicPageIds) === $isAcademyPage;
    if ($page->post_parent === $parentId) {
      array_push(
        $tree_nodes,
        array(
          'key' => $page->ID,
          'menu_order' => $page->menu_order,
          'label' => $page->post_title,
          'link' => get_page_link($page->ID),
          'current' => $page->ID === $currentPageId,
          'nodes' => $renderChildren ? build_tree_layer($page->ID, $currentPageId, $all_pages, $isAcademyPage, $academicPageIds) : []
        )
      );
    }
  }
  usort($tree_nodes, function($a, $b) {
    return $a['menu_order'] > $b['menu_order'];
  });
  return $tree_nodes;
}

?>