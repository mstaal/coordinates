function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            loc.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            loc.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            loc.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            loc.innerHTML = "An unknown error occurred."
            break;
    }
}
