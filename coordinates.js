var locactionlink;
var smslink;
var map;
var marker;
setLocationVariables();

function setLocationVariables() {
    window.locationlink = document.getElementById("location");
    window.smslink = document.getElementById("sms-link");
    return [window.locationlink,window.smslink]
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
  //setLocationVariables();
  var lati = position.coords.latitude;
  var long = position.coords.longitude;
  window.locactionlink.value = "google.com/maps/?q=" + lati + "," + long; // Google Maps link
  window.smslink.href = "sms:&body=" + "(" + lati + "," + long + ")";
  var latLng = new google.maps.LatLng(lati, long);
  map.panTo(latLng);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            window.locactionlink.value = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            window.locactionlink.value = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            window.locactionlink.value = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            window.locactionlink.value = "An unknown error occurred."
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
      //setLocationVariables();
      var mapCenter = map.getCenter();
      var lati = mapCenter.lat();
      var long = mapCenter.lng();
      marker.setPosition(mapCenter);
      window.locactionlink.value = "google.com/maps/?q=" + lati + "," + long; // Google Maps link
      window.smslink.href = "sms:&body=" + "google.com/maps/?q=" + lati + "," + long; // Google Maps link
    }, 1);
  });
}

google.maps.event.addDomListener(window, 'load', initializeMap);
