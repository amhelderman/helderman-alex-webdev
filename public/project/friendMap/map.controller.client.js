(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location, mapService, userService) {
        var model = this;


        model.map = {};
        model.mapPosition = {lat: 42.35, lng: -71.08};

        model.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setMapPos);
            }
            function setMapPos(position){
                // console.log(position);
                model.mapPosition = {lat: position.coords.latitude,
                                    lng: position.coords.longitude};
            }
        };

        function initMap() {
            console.log("HERES THE POS");
            console.log(model.mapPosition);
            initMapAtPosition(model.mapPosition);
            getNearbyUsers();
        }

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

        function addMarkerToMap(myLatLng){
            console.log("addMarkerToMap, heres latlng");
            console.log(myLatLng);
            console.log(typeof myLatLng);
            //Create the marker.
            circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                center: myLatLng,
                map: map,
                radius: 1000
            });

            marker = new google.maps.Marker({
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                position: myLatLng,
                map: map
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

        function initMapAtPosition(myLatLng){
            console.log(myLatLng);
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: myLatLng,
                    zoom: 14,
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





