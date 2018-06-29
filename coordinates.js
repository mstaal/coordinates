var loc = document.getElementById("location");
var map;
var marker;
var link = document.getElementById("sms-link");

// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        loc.value = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
  var loc = document.getElementById("location");
  var link = document.getElementById("sms-link");
  var lati = position.coords.latitude;
  var long = position.coords.longitude;
  loc.value = "(" + lati + "," + long + ")";
  link.href = "sms:&body=" + "(" + lati + "," + long + ")";
  var latLng = new google.maps.LatLng(lati, long);
  map.panTo(latLng);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            loc.value = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            loc.value = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            loc.value = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            loc.value = "An unknown error occurred."
            break;
    }
}

// Google Maps
var myPos = new google.maps.LatLng(41.890205,12.492245)

function initializeMap() {
  var mapProp = {
    center: myPos,
    zoom:18,
    panControl:true,
    zoomControl:true,
    mapTypeControl:false,
    scaleControl:true,
    streetViewControl:false,
    overviewMapControl:true,
    rotateControl:false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  map.setTilt(0);
  marker = new google.maps.Marker({
    position:myPos
  });
  marker.setMap(map);
  google.maps.event.addListener(map, 'center_changed', function() {
  // 3 seconds after the center of the map has changed, pan back to the
  // marker.
    window.setTimeout(function() {
      var loc = document.getElementById("location");
      var link = document.getElementById("sms-link");
      var mapCenter = map.getCenter();
      var lati = mapCenter.lat();
      var long = mapCenter.lng();
      marker.setPosition(mapCenter);
      // loc.value = "(" + lati + "," + long + ")"; // Coordinates
      loc.value = "google.com/maps/?q=" + lati + "," + long; // Google Maps link
      link.href = "sms:&body=" + "(" + lati + "," + long + ")";
    }, 1);
  });
}

google.maps.event.addDomListener(window, 'load', initializeMap);
