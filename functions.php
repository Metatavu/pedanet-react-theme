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
?>