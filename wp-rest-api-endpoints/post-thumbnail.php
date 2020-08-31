<?php

function register_featured_media_endpoint() {
  register_rest_route('wp/v2', '/postThumbnail', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $id = $request->get_param('id');
      $slug = $request->get_param('slug');
      $post = get_wp_post($id, $slug)[0];
      $postThumbnail = get_the_post_thumbnail_url($post);
      return $postThumbnail;
    }
  ));
}
add_action('rest_api_init', 'register_featured_media_endpoint');

function get_wp_post($id, $slug) {
  if ($id) {
    return get_posts(
      array(
        'p' => $id,
        'post_type' => 'page'
      )
    );
  }
  if ($slug) {
    return get_posts(
      array(
        'name' => $slug,
        'post_type' => 'page'
      )
    );
  }
}

?>