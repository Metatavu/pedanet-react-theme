<?php
  
  /** 
   * Returns localized item from an array
   * 
   * @param object[] $values array of localized values
   * @param string $language preferred language
   * @param string $type filter results by type. optional
   * @return object localized object or null
   */
  function getLocalizedItem($values, $language, $type = null) {
    if (!$values) {
      return null;
    }
    
    $filtered = array_filter($values, function($value) use($type) {
      return !empty($value["value"]) && (!$type || ($value["type"] == $type));
    });

    usort($filtered, function ($a, $b) {
      return $a["language"] == $language ? -1 : 1;
    });

    return $filtered[0] ? $filtered[0] : null;
  }

  /** 
   * Returns localized URL from an array
   * 
   * @param object[] $values array of localized values
   * @param string $language preferred language
   * @param string $type filter results by type. optional
   */
  function getLocalizedUrl($values, $language) {
    if (!$values) {
      return null;
    }
    
    $filtered = array_filter($values, function($value) {
      return !empty($value["url"]);
    });


    usort($filtered, function ($a, $b) {
      return $a["language"] == $language ? -1 : 1;
    });

    return $filtered[0] ? $filtered[0] : null;
  }



  /** 
   * Returns localized value from an array
   * 
   * @param object[] $values array of localized values
   * @param string $language preferred language
   * @param string $type filter results by type. optional
   */
  function getLocalizedValue($values, $language, $type = null) {
    $item = getLocalizedItem($values, $language, $type);
    return $item ? $item["value"] : "";
  }

  /**
   * Returns localized day name
   * 
   * @param $dayName day name
   * @return localized day name
   */
  function getLocalizedDayName($dayName) {
    switch ($dayName) {
      case "Monday":
        return __("Monday", "sptv");
      case "Tuesday":
        return __("Tuesday", "sptv");
      case "Wednesday":
        return __("Wednesday", "sptv");
      case "Thursday":
        return __("Thursday", "sptv");
      case "Friday":
        return __("Friday", "sptv");
      case "Saturday":
        return __("Saturday", "sptv");
      case "Sunday":
        return __("Sunday", "sptv");
    }

    return $dayName;
  }

  /**
   * Returns abbreviated day name
   * 
   * @param $dayName day name
   * @return abbreviated day name
   */
  function getAbbreviatedDayName($dayName) {
    switch ($dayName) {
      case "Monday":
        return "ma";
      case "Tuesday":
        return "ti";
      case "Wednesday":
        return "ke";
      case "Thursday":
        return "to";
      case "Friday":
        return "pe";
      case "Saturday":
        return "la";
      case "Sunday":
        return "su";
    }

    return $dayName;
  }

  /**
   * Converts wraps text into html paragraphs by line breaks
   * 
   * @param string $text text
   * @return string text as html
   */
  function nl2p($text) {
    if (!$text) {
      return "";
    }

    return implode("", array_map(function ($line) {
      return "<p>$line</p>";
    }, explode("\n", $text)));
  }

  /**
   * Formats service hours
   * 
   * @param object $serviceHours service hours
   * @return string formatted service hours
   */
  function formatServiceHours($serviceHours) {
    $result = '';

    foreach ($serviceHours as $serviceHour) {
      if ($serviceHour["serviceHourType"] == "DaysOfTheWeek") {
        $additionalInformation = getLocalizedValue($serviceHour["additionalInformation"], $data->language);
        $openingHours = $serviceHour["openingHour"];
        $result .= "<h3>Aukioloajat</h3>";
        
        $result .= "<div class='opening-hours'>";
        if (!$serviceHour["isClosed"] && count($openingHours) == 0) {
          $result .= "<p>" . __("Open 24 hours.", "sptv") . "</p>";
        } else {
          $result .= "<table><tbody>";
          $result .= formatOpeningHours($openingHours);
          $result .= "</tbody></table>";
        }
        $result .= "</div>";

      }
    }

    return $result;
  }

  /**
   * Formats opening hour object.
   * 
   * @param object $openingHour openingHour
   * @return string formatted object
   */
  function formatOpeningHour($openingHour) {
    $days = isset($openingHour['dayFrom']) ? getAbbreviatedDayName($openingHour['dayFrom']) : '';
    $from = "";
    $to = "";

    if (isset($openingHour['dayTo']) && $openingHour['dayTo'] != "") {
      $days .= ' - ' . getAbbreviatedDayName($openingHour['dayTo']);
    }

    if (isset($openingHour['from'])) {
      $from = implode('.', array_slice(explode(':', $openingHour['from']), 0, 2));
    }

    if (isset($openingHour['to'])) {
      $to = implode('.', array_slice(explode(':', $openingHour['to']), 0, 2));
    }

    $result = "<tr>";
    $result .= "<td>${days}</td>";

    if (!empty($from) || !empty($to)) {
      $result .= "<td>${from} - ${to}</td>";
    } else {
      $result .= "<td>${from}</td>";
    }
    $result .= "</tr>";

    return $result;
  }

  /**
   * Formats list of opening hours
   * 
   * @param object[] $openingHours openingHours
   * @return string formatted string
   */
  function formatOpeningHours($openingHours) {
    $openingHours = simplifyOpeningHours($openingHours);
    return join("", array_map(function ($openingHour) {
      return formatOpeningHour($openingHour);
    }, $openingHours));
  }

  /**
   * Simplifies opening hours by uniting consecutive days with identical opening hours
   * 
   * @param object[] $openingHours opening hours array
   * @return object[] simplified opening hours
   */
  function simplifyOpeningHours($openingHours) {
    $simplified = array();

    for ($i = 0; $i < count($openingHours); $i++) {
      $openingHour = $openingHours[$i];
      if (isset($openingHour['dayTo']) && $openingHour['dayTo'] != "" || empty($simplified)) {
        $simplified[] = $openingHour;
      } else {
        $lastSimplified = end($simplified);
        
        if (
          $lastSimplified['from'] == $openingHour['from'] &&
          $lastSimplified['to'] == $openingHour['to']
        ) {
          $lastSimplified['dayTo'] = $openingHour['dayFrom'];
          array_splice($simplified, count($simplified) - 1, 1, [ $lastSimplified ]);
        } else {
          $simplified[] = $openingHour;
        }
      }
    }

    return $simplified;
  }

?>