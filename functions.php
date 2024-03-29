<?php
  require_once(__DIR__ . '/debug-utils.php');

  //TODO: Remove this abomination
  add_filter('rest_category_query', function ($args, $request) {
    if ($args['number'] == 100) {
      $args['number'] = 500;
    }
    return $args;
  }, 10, 2);

  /**
   * Actions to do after custom theme is set up
   */
  add_action('after_setup_theme', function() {
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'main' => __('Main Navigation', 'pedanet'),
      'locale' => __('Localization menu', 'pedanet'),
      'site' => __('Site Navigation', 'pedanet'),
      'quick' => __('Quick Links', 'pedanet'),
      'footer' => __('Footer Navigation', 'pedanet')
    ]);
  });

  /**
   * Registers custom taxonomy
   */
  function register_custom_taxonomy() {
    $labels = [
      'name' => _x('Oppilaitos', 'taxonomy general name'),
      'singular_name' => _x('Oppilaitos', 'taxonomy singular name'),
      'search_items' =>  __('Etsi oppilaitoksia'),
      'popular_items' => __('Suosittuja oppilaitoksia'),
      'all_items' => __('Kaikki oppilaitokset'),
      'parent_item' => null,
      'parent_item_colon' => null,
      'edit_item' => __('Muokkaa oppilaitosta'),
      'update_item' => __('Päivitä oppilaitos'),
      'add_new_item' => __('Lisää uusi oppilaitos'),
      'new_item_name' => __('Uuden oppilaitoksen nimi'),
      'separate_items_with_commas' => __('Erota oppilaitokset pilkulla'),
      'add_or_remove_items' => __('Lisää tai poista oppilaitoksia'),
      'choose_from_most_used' => __('Valitse eniten käytetyistä oppilaitoksista'),
      'menu_name' => __('Oppilaitokset')
    ];
    register_taxonomy('academy', [ 'page', 'post' ], [
      'hierarchical' => true,
      'labels' => $labels,
      'show_ui' => true,
      'show_admin_column' => true,
      'show_in_rest' => true,
      'rest_base' => 'taxonomy/academy',
      'update_count_callback' => '_update_post_term_count',
      'query_var' => true,
      'rewrite' => [ 'slug' => 'academy' ],
      'public' => true
    ]);
  }

  add_action('init', 'register_custom_taxonomy', 0);

  /**
   * Returns given string as URL-friendly
   *
   * @param text text
   */
  function slugify ($text, string $divider = '_') {
    $text = strtolower($text);
    $text = preg_replace('~[^\pL\d]+~u', $divider, $text);
    $text = str_replace('ö', 'o', $text);
    $text = str_replace('ä', 'a', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, $divider);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
  }

  /**
   * Assign school terms to saved post based on user roles
   *
   * TODO: Figure out some better way to do this hideous mess!!!
   *
   * @param id post id
   */
  function add_terms_for_post($id) {
    $existingTerms = wp_get_post_terms($id, 'academy');

    if (sizeOf($existingTerms) > 0) {
      return;
    }

    $academies = get_terms('academy', [ 'hide_empty' => false ]);
    $roles = wp_get_current_user()->roles;

    $terms = [];

    foreach ($academies as $academy) {
      $slug = slugify($academy->name);

      if (in_array($slug, $roles)) {
        $terms[] = $academy->name;
      }
    }

    wp_set_object_terms($id, $terms, 'academy');
  }

  add_action('save_post', 'add_terms_for_post');

  require_once(__DIR__ . '/wp-rest-api-endpoints/main-menu.php');
  require_once(__DIR__ . '/wp-rest-api-endpoints/tree-menu.php');
  require_once(__DIR__ . '/wp-rest-api-endpoints/post-thumbnail.php');

  /**
   * Filter for service location channel components of SPTV plugin
   */
  add_filter('sptv_service_location_service_channel_components', function ($templates) {
    $templates[] = [
      'slug' => 'accessibility',
      'name' => __('Esteettömyystiedot', 'sptv')
    ];

    $templates[] = [
      'slug' => 'contact-info',
      'name' => __('Yhteystiedot - sivupaneeli', 'sptv')
    ];

    return $templates;
  });

  /**
   * Filter for overriding events calendar view labels
   */
  add_filter('tec_events_views_v2_view_label', function ($label) {
    if ($label == "Day") {
      return "Päivä";
    }

    if ($label == "Month") {
      return "Kuukausi";
    }

    if ($label == "List") {
      return "Lista";
    }

    return $label;
  });

  /**
   * Settings
   */
  add_action('admin_menu', function () {
    $title = __('Additional theme settings', 'pedanet-react-theme');
    add_theme_page($title, $title, 'edit_theme_options', 'pedanet-theme-options', function () {
      echo '<div class="wrap">';
      echo "<h1>$title</h1>";
      echo '<form method="post" action="options.php">';
      settings_fields("pedanet-theme-options");
      do_settings_sections("pedanet-theme-options");
      submit_button();
      echo '</form>';
      echo '</div>';
    });
  });

  add_action('admin_init', function () {
    $elasticUrl = __('Elastic url', 'pedanet-react-theme');
    add_settings_section('pedanet-theme-options', null, null, 'pedanet-theme-options');
    add_settings_field('theme_elastic_url', $elasticUrl, function () {
      $url = get_option('theme_elastic_url');
      echo "<input style='width: 600px;' type='url' name='theme_elastic_url' value='$url'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_elastic_url');

    $elasticKey = __('Elastic key', 'pedanet-react-theme');
    add_settings_field('theme_elastic_key', $elasticKey, function () {
      $key = get_option('theme_elastic_key');
      echo "<input style='width: 600px;' type='text' name='theme_elastic_key' value='$key'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_elastic_key');

    $mikkeliDomainTitle = __('Mikkeli domain', 'pedanet-react-theme');
    add_settings_field('theme_mikkeli_domain', $mikkeliDomainTitle, function () {
      $mikkeliDomain = get_option('theme_mikkeli_domain');
      echo "<input style='width: 600px;' type='url' name='theme_mikkeli_domain' value='$mikkeliDomain'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_mikkeli_domain');

    $oppiminenDomainTitle = __('Oppiminen domain', 'pedanet-react-theme');
    add_settings_field('theme_oppiminen_domain', $oppiminenDomainTitle, function () {
      $oppiminenDomain = get_option('theme_oppiminen_domain');
      echo "<input style='width: 600px;' type='url' name='theme_oppiminen_domain' value='$oppiminenDomain'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_oppiminen_domain');

    $resultPlaceholderImageTitle = __('Result image placeholder url', 'pedanet-react-theme');
    add_settings_field('theme_result_placeholder_image', $resultPlaceholderImageTitle, function () {
      $resultPlaceholderImage = get_option('theme_result_placeholder_image');
      echo "<input style='width: 600px;' type='url' name='theme_result_placeholder_image' value='$resultPlaceholderImage'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_result_placeholder_image');

    add_settings_field('theme_read_speaker_id', "Read speaker id", function () {
      $readSpeakerId = get_option('theme_read_speaker_id');
      echo "<input style='width: 600px;' type='text' name='theme_read_speaker_id' value='$readSpeakerId'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'theme_read_speaker_id');

    add_settings_field('google_analytics_measurement_id', "Google Analytics Measurement ID", function () {
      $googleAnalyticsMeasurementId = get_option('google_analytics_measurement_id');
      echo "<input style='width: 600px;' type='text' name='google_analytics_measurement_id' value='$googleAnalyticsMeasurementId'/>";
    }, 'pedanet-theme-options', 'pedanet-theme-options');
    register_setting( 'pedanet-theme-options', 'google_analytics_measurement_id');
  });

  add_action('after_setup_theme', function () {
    load_theme_textdomain('pedanet-react-theme', get_template_directory() . '/lang/');
  });

  add_action( 'admin_notices', 'print_button' );
  function print_button() {
    // Get the current screen so you only move forward if this is the users.php screen.
    $screen = get_current_screen();
    if ( 'users' == $screen->id ) { ?>
      <div class="print-user-info-btn">
        <button onclick="window.print();return false;">Tulosta tiedot</button>
      </div>
    <?php }
  }

  /**
   * Register and enqueue a custom print stylesheet in the WordPress admin.
   */
  function mikkeli_enqueue_custom_admin_style() {
    wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/css/admin_print.css', false, '1.0.0' );
    wp_enqueue_style( 'custom_wp_admin_css' );
  }
  add_action( 'admin_enqueue_scripts', 'mikkeli_enqueue_custom_admin_style' );

/**
 * Add Google Analytics tracking code to custom action hook
 */
function add_google_analytics_code_to_custom_location() {
    $googleAnalyticsMeasurementId = get_option('google_analytics_measurement_id');
    
    if ($googleAnalyticsMeasurementId) {
        ?>
        <!-- Google Analytics Tracking Code -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_html($googleAnalyticsMeasurementId); ?>"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '<?php echo esc_html($googleAnalyticsMeasurementId); ?>');
        </script>
        <!-- End Google Analytics Tracking Code -->
        <?php
    }
}

add_action('GA_custom_hook', 'add_google_analytics_code_to_custom_location');

?>
