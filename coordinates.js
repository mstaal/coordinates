var locactionlink;
var smslink;
var locationlinkText
var map;
var marker;
[locationlink, smslink] = defineLocationVariables();
// Google Maps
getLocation();
var myPos = new google.maps.LatLng(41.890205,12.492245)
google.maps.event.addDomListener(window, 'load', initializeMap);

function defineLocationVariables() {
    locationlink = document.getElementById("location");
    smslink = document.getElementById("sms-link");
    return [locationlink, smslink];
}

function setLocationVariables(latitude, longitude) {
    [locationlink, smslink] = defineLocationVariables();
    var locactionlinkValue = "google.com/maps/?q=" + latitude + "," + longitude; // Google Maps link
    var smsbody = "sms:&body=";
    locationlink.value = locactionlinkValue;
    smslink.href = smsbody + locactionlinkValue;
}

// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        window.locationlink.value = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
  var lati = position.coords.latitude;
  var long = position.coords.longitude;
  setLocationVariables(lati, long);
  var latLng = new google.maps.LatLng(lati, long);
  map.panTo(latLng);
}

function centerChangeBehaviour() {
  // 3 seconds after the center of the map has changed, pan back to the
  // marker.
    window.setTimeout(function() {
      var mapCenter = map.getCenter();
      var lati = mapCenter.lat();
      var long = mapCenter.lng();
      marker.setPosition(mapCenter);
      setLocationVariables(lati, long);
    }, 1);
}

function initializeMap() {
  var mapProp = {
    center: myPos,
    zoom: 18,
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    overviewMapControl: true,
    rotateControl: false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  map.setTilt(0);
  marker = new google.maps.Marker({
    position: myPos
  });
  marker.setMap(map);
  google.maps.event.addListener(map, 'center_changed', centerChangeBehaviour);
}

function showError(error) {
    [locationlink, smslink] = defineLocationVariables();
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locactionlink.value = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            locactionlink.value = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            locactionlink.value = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            locactionlink.value = "An unknown error occurred."
            break;
    }
}
