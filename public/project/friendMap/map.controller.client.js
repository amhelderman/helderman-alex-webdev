(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location, mapService, profileService) {
        var model = this;

        model.map = {};
        model.mapPosition = {lat: 42.35, lng: -71.08};
        model.locations = [];

        init();
        function init() {
            console.log("mapController.");
            mapService.then( function(){
                    initMapAtPosition(model.mapPosition);
                    getNearbyUsers();
                });
        }

        function getNearbyUsers(){
            console.log("mapController - client - getNearbyUsers");
            profileService.getLocations(model.mapPosition)
                .then(function(response){
                    model.locations = response.data;
                    console.log(["mapController received locations:", model.locations]);
                    for(var u in  model.locations){
                        if( model.locations[u] === null){continue;}
                        addMarkerToMap( model.locations[u]);
                    }
                });
        }

        function addMarkerToMap(myLatLng){
            //Create the marker.
            circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 0,
                fillColor: '#c7eeff',
                fillOpacity: 0.35,
                center: myLatLng,
                map: map,
                radius: 200
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
            var fenway = {lat: 42.345573, lng: -71.098326};
            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), {
                    position: fenway,
                    pov: {
                        heading: 34,
                        pitch: 10
                    }
                });
            map.setStreetView(panorama);
        }




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





