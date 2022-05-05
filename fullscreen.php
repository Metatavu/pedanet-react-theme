<?php /* Template Name: Fullscreen */ ?>
<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
  </head>
  <body class="template-fullscreen">
    <?php require get_template_directory() . '/inc/template-loader.php'; ?>
    <div id="root"></div>
    <?php 

        $script_name = get_template_directory_uri() . '/dist/bundle.js';
        $url = get_option('theme_elastic_url');
        $key = get_option('theme_elastic_key');
        $mikkeliDomain = get_option('theme_mikkeli_domain');
        $oppiminenDomain = get_option('theme_oppiminen_domain');

        echo "<script name='bundle_script' data-mikkeli-domain='$mikkeliDomain' data-oppiminen-domain='$oppiminenDomain' data-elastic-url='$url' data-elastic-key='$key' type='text/javascript' src='$script_name'></script>";

    ?>
    
  </body>
</html>