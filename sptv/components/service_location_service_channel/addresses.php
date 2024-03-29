<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;
  $addresses = $data->serviceChannel["addresses"];
  if (!$addresses) {
    return;
  }

  $services = $serviceChannel["services"];
  $serviceId = !empty($services) ? $services[0]["service"]["id"] : null;
  $serviceChannelId = $serviceChannel["id"];

  foreach ($addresses as $address) {
    if ($address["type"] == "Location") {
      $streetAddress = $address["streetAddress"];
      $latitude = $streetAddress["latitude"];
      $longitude = $streetAddress["longitude"];
      $mapUrl = $serviceId ? "https://www.suomi.fi/kartta/palvelupaikat/$serviceId?sl=$serviceChannelId" : null;
      $routeUrl = $latitude && $longitude ? "https://www.suomi.fi/kartta/reitit?to.lat=$latitude&to.lon=$longitude" : null;

      echo "<div class=\"ptv-addresses\">";
      echo "<p>";
      echo oppiminenGetLocalizedValue($streetAddress["street"], $data->language) . " " . $streetAddress["streetNumber"];
      echo "<br/>";
      echo $streetAddress["postalCode"] . " " . oppiminenGetLocalizedValue($streetAddress["postOffice"], $data->language);

      if ($mapUrl) {
        echo "<br/>";
        echo "<a class=\"ptv-address-link\" target=\"_blank\" href=\"$mapUrl\">Palvelupaikka kartalla</a>";
      }

      if ($routeUrl) {
        echo "<br/>";
        echo "<a class=\"ptv-address-link\" target=\"_blank\" href=\"$routeUrl\">Näytä reitti tänne</a>";
      }

      echo "</p>";
      echo "</div>";
    }
  }

?>
