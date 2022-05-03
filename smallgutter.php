<?php /* Template Name: Small gutter */ ?>
<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
  </head>
  <body class="template-smallgutter">
    <?php require get_template_directory() . '/inc/template-loader.php'; ?>
    <div id="root"></div>
    <?php 
  
        $script_name = get_template_directory_uri() . '/dist/bundle.js';
        $url = get_option('theme_elastic_url');
        $key = get_option('theme_elastic_key');
        echo "<script name='bundle_script' data-elastic-url='$url' data-elastic-key='$key' type='text/javascript' src='$script_name'></script>";
     
    ?>
  </body>
</html>