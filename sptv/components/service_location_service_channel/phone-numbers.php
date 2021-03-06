<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;
  $phoneNumbers = $serviceChannel ["phoneNumbers"];


  if (!$phoneNumbers) {
    return;
  }
  
  foreach ($phoneNumbers as $phoneNumber) {
    $additionalInformation = $phoneNumber["additionalInformation"];
    $prefixNumber = $phoneNumber["prefixNumber"];
    $number = $phoneNumber["number"];
    $chargeInfo = "";

    switch ($phoneNumber["serviceChargeType"]) {
      case "Chargeable":
        $chargeInfo = __("Chargeable", "sptv");
    }

    echo "<div class=\"ptv-phone-numbers\">";
    echo "<p>";

    if ($additionalInformation) {
      echo $additionalInformation;
      echo "<br/>";
    }

    echo implode(" ", [$prefixNumber, $number, $chargeInfo]);

    echo "</p>";
    echo "</div>";
  }

?>
