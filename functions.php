<?php 
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'main' => __('Main Navigation', "muisti"),
      'locale' => __('Localization menu', "muisti"),
      'site' => __('Site Navigation', "muisti"),
      'quick' => __('Quick Links', "muisti"),
      'footer' => __('Footer Navigation', "muisti")
    ]);
  });
?>