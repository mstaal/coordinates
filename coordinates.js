var loc = document.getElementById("location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        loc.value = "Geolocation is not supported by this browser.";
        // x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //x.innerHTML = "(" + position.coords.latitude + "," + position.coords.longitude + ")";
    document.getElementById("location").value = "(" + position.coords.latitude + "," + position.coords.longitude + ")";
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
