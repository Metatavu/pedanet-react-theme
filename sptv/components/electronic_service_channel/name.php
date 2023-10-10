<?php
  require_once(__DIR__ . '/../common.php');
  echo "<h3>";
  echo oppiminenGetLocalizedValue($data->serviceChannel["serviceChannelNames"], $data->language, "Name");
  echo "</h3>";
?>