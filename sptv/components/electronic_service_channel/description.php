<?php
  require_once(__DIR__ . '/../common.php');
  
  echo "<p>";
  echo oppiminenNl2p(oppiminenGetLocalizedValue($data->serviceChannel["serviceChannelDescriptions"], $data->language, "Description"));
  echo "</p>";
?>