<?php
  require_once(__DIR__ . '/../common.php');
  
  echo "<div class=\"ptv-name\">";
  echo "<h3>";
  echo getLocalizedValue($data->serviceChannel["serviceChannelNames"], $data->language, "Name");
  echo "</h3>";
  echo "</div>";
?>