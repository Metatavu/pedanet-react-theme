<?php /* Template Name: Dangerous */ ?>
<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
  </head>
  <body class="template-dangerous">
    <?php require get_template_directory() . '/inc/template-loader.php'; ?>
    <div id="root"></div>
    <?php 

        $script_name = get_template_directory_uri() . '/dist/bundle.js';
        $url = get_option('theme_elastic_url');
        $key = get_option('theme_elastic_key');
        $mikkeliDomain = get_option('theme_mikkeli_domain');
        $oppiminenDomain = get_option('theme_oppiminen_domain');
        $resultPlaceholderImage = get_option('theme_result_placeholder_image');
        $readSpeakerId = get_option('theme_read_speaker_id');

        echo "<script name='bundle_script' data-read-speaker-id='$readSpeakerId' data-result-placeholder-image='$resultPlaceholderImage' data-mikkeli-domain='$mikkeliDomain' data-oppiminen-domain='$oppiminenDomain' data-elastic-url='$url' data-elastic-key='$key' type='text/javascript' src='$script_name'></script>";
    ?>
  </body>
</html>