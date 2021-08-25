<?php
  /**
   * Logs given output to browser console via echoed Javascript console.log method
   *
   * @param output output to log
   * @param withScriptTags whether to echo with script tags or not
   */
  function console_log($output, $withScriptTags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';

    if ($withScriptTags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
  }
?>