<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;
  echo oppiminenFormatServiceHours($serviceChannel["serviceHours"]);

?>
