<?php /* Template Name: Small gutter */ ?>
<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
    <script src="//cdn1.readspeaker.com/script/8419/webReader/webReader.js?pids=wr" type="text/javascript"></script>
  </head>
  <body class="template-smallgutter">
    <?php require get_template_directory() . '/inc/template-loader.php'; ?>
    <div id="root"></div>
    <?php 
  
        $script_name = get_template_directory_uri() . '/dist/bundle.js';
        $url = get_option('theme_elastic_url');
        $key = get_option('theme_elastic_key');
        $mikkeliDomain = get_option('theme_mikkeli_domain');
        $resultPlaceholderImage = get_option('theme_result_placeholder_image');

        echo "<script name='bundle_script' data-result-placeholder-image='$resultPlaceholderImage' data-mikkeli-domain='$mikkeliDomain' data-oppiminen-domain='$oppiminenDomain' data-elastic-url='$url' data-elastic-key='$key' type='text/javascript' src='$script_name'></script>";
    ?>
  </body>
</html>