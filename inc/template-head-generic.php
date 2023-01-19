<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo get_option('google_analytics_measurement_id'); ?>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '<?php echo get_option('google_analytics_measurement_id'); ?>');
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-language" content="<?php echo get_locale();?>">
<meta property="og:locale" content="<?php echo get_locale();?>" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/inc/loader.css" />
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri() ?>" />
<link rel="icon" type="image/png" href="<?php bloginfo('template_url') ?>/inc/favicon.png" sizes="512x512" />
<title>Mikkeli - Oppiminen</title>
<script>
  window.THEME_PATH = "<?php bloginfo('template_url');?>";
  window.rsConf = { general: { usePost: true } }
</script>
<script src="//cdn1.readspeaker.com/script/<?php echo get_option('theme_read_speaker_id'); ?>/webReader/webReader.js?pids=wr" type="text/javascript"></script>