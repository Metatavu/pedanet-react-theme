<?php /* Template Name: Fullscreen */ ?>
<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
  </head>
  <body class="template-fullscreen">
    <?php require get_template_directory() . '/inc/template-loader.php'; ?>
    <div id="root"></div>
    <script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/dist/bundle.js"></script>
  </body>
</html>