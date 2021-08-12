<html lang="fi">
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
  </head>
  <body>
    <?php if (preg_match('(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)', $_SERVER['HTTP_USER_AGENT'])) { ?>
      <?php require get_template_directory() . '/inc/template-loader.php'; ?>
      <div id="root"></div>
      <script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/dist/bundle.js"></script>
    <?php } else { ?>
      <?php require get_template_directory() . '/inc/template-deprecation-warning.php' ?>
    <?php } ?>
  </body>
</html>
