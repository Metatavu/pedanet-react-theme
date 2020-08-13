<?php
function register_tree_menu_endpoint() {
    register_rest_route( 'wp/v2', '/treeMenu', array(
      'methods' => 'GET',
      'callback' => function (WP_REST_Request $request) {
        $slug = $request->get_param('slug');
        $page = page_by_slug($slug);
        $isAcademyPage = get_the_terms($page, 'academy') ? true : false;
        $mainPage = get_main_page($page, $isAcademyPage);
        $initial_open_nodes = get_initial_open_nodes($page, $isAcademyPage);
        $treeData = build_tree($mainPage, $page);
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

  function get_main_page($page, $isAcademyPage) {
    if ($isAcademyPage) {
      $current = $page;
      $parentIsAcademyPage = $isAcademyPage;
      while (wp_get_post_parent_id($current)) {
        $parentId = wp_get_post_parent_id($current);
        $parent = get_post($parentId);
        $parentIsAcademyPage = get_the_terms($parent, 'academy') ? true : false;
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

  function get_initial_open_nodes($page, $isAcademyPage) {
    $initial_open_nodes = array("$page->ID");
    if ($isAcademyPage) {
      $current = $page;
      $parentIsAcademyPage = $isAcademyPage;
      while (wp_get_post_parent_id($current)) {
        $parentId = wp_get_post_parent_id($current);
        $parent = get_post($parentId);
        $parentIsAcademyPage = get_the_terms($parent, 'academy') ? true : false;
        if (!$parentIsAcademyPage) {
          break;
        }
        $current = $parent;
        if (wp_get_post_parent_id($current)) {
          $id = "$current->ID";
          for ($i = 0; $i < count($initial_open_nodes); $i++) {
            $initial_open_nodes[$i] = "$id/" . $initial_open_nodes[$i];
          }
          array_unshift($initial_open_nodes, $id);
        }
      }
    } else {
      $current = $page;
      while (wp_get_post_parent_id($current)) {
        $parentId = wp_get_post_parent_id($current);
        $current = get_post($parentId);
        if (wp_get_post_parent_id($current)) {
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

  function build_tree($mainPage, $page) {
    $all_pages = get_pages(array('child_of' => $mainPage->ID));
    return build_tree_layer($mainPage->ID, $page->ID, $all_pages);
  }

  function build_tree_layer($parentId, $currentPageId, $all_pages) {
    $tree_nodes = array();
    foreach($all_pages as $page) {
      if ($page->post_parent === $parentId) {
        array_push(
          $tree_nodes,
          array(
            'key' => $page->ID,
            'menu_order' => $page->menu_order,
            'label' => $page->post_title,
            'link' => get_page_link($page->ID),
            'current' => $page->ID === $currentPageId,
            'nodes' => build_tree_layer($page->ID, $currentPageId, $all_pages)
          )
        );
      }
    }
    $tree_nodes_sorted = array();
    for ($i = 0; $i < count($tree_nodes); $i++) {
      $node = find_array_item($tree_nodes, 'menu_order', $i);
      array_push($tree_nodes_sorted, $node);
    }
    return $tree_nodes_sorted;
  }

  function find_array_item($array, $key, $value) {
    foreach($array as $item) {
      if ($item[$key] === $value) {
        return $item;
      }
    }
    return false;
  }
?>