<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;

  echo "<h2>YHTEYSTIEDOT</h2>";
  include "email.php";
  include "phone-numbers.php";

  echo "<h3>Käyntiosoite</h3>";

  include "addresses.php";
  include "service-hours.php";

?>