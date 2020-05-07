<html>
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
    
    <!-- Facebook Pixel Code -->

    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '665410973866500');
      fbq('track', 'PageView');
    </script>

    <noscript>
      <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=665410973866500&ev=PageView&noscript=1"/>
    </noscript>

    <!-- End Facebook Pixel Code -->
  </head>
  <body>
    <?php if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || preg_match('~Trident/7.0(; Touch)?; rv:11.0~',$_SERVER['HTTP_USER_AGENT']) === 0) { ?>
      <?php require get_template_directory() . '/inc/template-loader.php'; ?>
      <div id="root"></div>
      <script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/dist/bundle.js"></script>
    <?php } else { ?>
      <?php require get_template_directory() . '/inc/template-deprecation-warning.php' ?>
    <?php } ?>
  </body>
</html>