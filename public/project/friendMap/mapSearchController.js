(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapSearchController", mapSearchController)

    function mapSearchController($location, mapService) {
        var model = this;

        model.msg = "MapSearchController is working";
        function init() {
            console.log("mapSearchController.");
            // createMap();

                mapService.then(initMap);


        }

        init();

        model.map = {};


        model.moveMap = function(){
            console.log("MOVE MAP:");
            var myLatLng = {latitude: Number(model.myLat),
                            longitude: Number(model.myLon)};
            console.log(myLatLng);

            initMapAtPosition(myLatLng);

        };


        model.getLocation = function () {
            console.log("HI");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMapAtPosition);
            }
        };
        function initMap() {
            position = {latitude: -34.397, longitude: 150.644};
            initMapAtPosition(position);
        }

        function initMapAtPosition(position){
            console.log(position);
            var myLatLng = {lat: position.latitude,
                        lng: position.longitude};
            console.log(myLatLng);
            var marker = false;
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: myLatLng,
                    zoom: 15,
                    styles: customMapStyle
                });



            //Listen for any clicks on the map.
            google.maps.event.addListener(map, 'click', function(event) {
                //Get the location that the user clicked.
                var clickedLocation = event.latLng;
                //If the marker hasn't been added.
                if(marker === false){
                    //Create the marker.
                    marker = new google.maps.Marker({
                        position: clickedLocation,
                        map: map,
                        draggable: true //make it draggable
                    });
                    //Listen for drag events!
                    google.maps.event.addListener(marker, 'dragend', function(event){
                        // markerLocation()
                        var pos = marker.getPosition();
                        myLatLng = {lat: pos.coords.latitude,
                                    lng: pos.coords.longitude};
                    });
                } else{
                    //Marker has already been added, so just change its location.
                    marker.setPosition(clickedLocation);
                }
                //Get the marker's location.
                // markerLocation();
            });

            // var marker = new google.maps.Marker({
            //     position: myLatLng,
            //     map: map,
            //     title: 'Hello World!'
            // });
        }
    }


    var customMapStyle = [
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

})();





