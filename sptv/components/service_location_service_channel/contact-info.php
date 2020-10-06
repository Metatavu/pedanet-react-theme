<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;

  echo "<h3>YHTEYSTIEDOT</h3>";
  include "email.php";
  include "phone-numbers.php";

  echo "<h4>" . __("Visiting information", "sptv") . "</h4>";

  include "addresses.php";
  include "service-hours.php";

?>