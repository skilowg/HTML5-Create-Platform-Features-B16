// jQuery to delay "submit" and wish user good luck
jQuery(document).ready(function() {
  $("#contest").on("submit", function(e) {
    var form = this;
    e.preventDefault();
    var firstName = $("#first-name").val();
    var message = "Good luck, " + firstName + "!";
    $("#thankyou").html(message);
    setTimeout(function () {
      form.submit();
    }, 2000);
  });
});

// Map of geolocation with directions to destination
if (navigator.geolocation) { //Checks if browser supports geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;                    //users current
    var longitude = position.coords.longitude;                 //location
    var coords = new google.maps.LatLng(latitude, longitude);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 15,  //Sets zoom level (0-21)
    //	center: coords, //zoom in on users location
      mapTypeControl: true, //allows you to select map type eg. map or satellite
      navigationControlOptions:
      {
        style: google.maps.NavigationControlStyle.SMALL //sets map control size
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP //Options: ROADMAP, SATELLITE, HYBRID, TERRAIN
    };

    var mapcanvas = document.createElement('div'); // Create canvas on page
    mapcanvas.id = 'mapcanvas';
    mapcanvas.style.height = '500px';
    mapcanvas.style.width = '900px';

    // Fill canvas with new map
    document.querySelector('.map').appendChild(mapcanvas);
    map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);

    var rendererOptions = {
      map: map
    };

    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay.setMap(map);

		var request = {
			origin: coords,
			destination: '40.7216954, -74.0040441',
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  });
}
