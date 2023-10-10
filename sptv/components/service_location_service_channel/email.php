<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;
  $emails = $serviceChannel ["emails"];

  if (!$emails) {
    return;
  }

  echo "<div class=\"ptv-emails\">";
  echo "<p>";
  echo oppiminenGetLocalizedValue($emails, $data->language);
  echo "</p>";
  echo "</div>";

?>
