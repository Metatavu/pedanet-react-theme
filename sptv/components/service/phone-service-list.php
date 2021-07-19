<?php
  require_once(__DIR__ . '/../common.php');

  $service = $data->service;
  $serviceChannels = $data->serviceChannels;
  error_log(print_r($service, true));

  if ($serviceChannels) {
    echo "<h3>Yhteystiedot</h3>";

    foreach ($serviceChannels as $serviceChannel) {
      $email = count($serviceChannel["supportEmails"]) > 0 ? $serviceChannel["supportEmails"][0]["value"] : "";
      $phoneInfo = count($serviceChannel["serviceChannelDescriptions"]) > 0 ? $serviceChannel["serviceChannelDescriptions"][0]["value"] : "";
      $phone = count($serviceChannel["phoneNumbers"]) > 0 ? $serviceChannel["phoneNumbers"][0]["number"] : "";

      if ($email) {
        echo "<a href='mailto:$email'><p>$email</p></a>";
      }

      if ($phoneInfo) {
        echo "<p>$phoneInfo </p>";
      }
      
      if ($phone) {
        echo "<p>$phone </p>";
      }
    }
  }
?>