(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location, mapService, userService) {
        var model = this;


        model.map = {};
        model.mapPosition = {latitude: -34.397, longitude: 150.644};

        model.getLocation = function () {
            console.log("HI");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMapAtPosition);
            }
        };

        function getNearbyUsers(){
            console.log("mapController - client - getNearbyUsers");
            console.log(model.mapPosition);

            // TODO: Make this only get nearby users.
            var userLocations = userService.getUserLocations();
            for(u in userLocations){
                var loc = userLocations[u];
                console.log(loc);
                addMarkerToMap(userLocations[u]);
            }
        }

        function addMarkerToMap(markerPosition){
            var myLatLng = {lat: markerPosition.latitude,
                            lng: markerPosition.longitude};

            //Create the marker.
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function (event) {
                // markerLocation()
                var pos = marker.getPosition();
                myLatLng = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
            });
        }

        function initMap() {
            initMapAtPosition(model.mapPosition);
            getNearbyUsers();
        }

        function initMapAtPosition(position){
            console.log(position);
            var myLatLng = {lat: position.latitude,
                            lng: position.longitude};
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: myLatLng,
                    zoom: 15,
                    styles: myStyles
                });
            //Listen for any clicks on the map.
            google.maps.event.addListener(map, 'click', function(event) {

            });
        }
        function init() {
            console.log("mapController.");
            // createMap();

            model.getLocation();
            mapService.then(initMap);
        }

        init();


        var myStyles = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ];
    }

})();





