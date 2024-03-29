<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;

  $webPages = $serviceChannel ["webPages"];

  if (!$webPages) {
    return;
  }

  $webPage = oppiminenGetLocalizedItem($webPages, $data->language);
  if ($webPage) {
    $url = $webPage["url"];
    $text = $webPage["value"];
    echo "<div class=\"ptv-webpage\">";
    echo "<p>";
    echo "<a target=\"_blank\" href=\"$url\">$text</a>";
    echo "</p>";
    echo "</div>";
  }

?>
