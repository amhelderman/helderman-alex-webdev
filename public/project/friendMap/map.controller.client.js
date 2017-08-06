(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location, mapService) {
        var model = this;

        function init() {
            console.log("mapController.");
            // createMap();

                mapService.then(initMap);


        }

        init();

        model.map = {};

        model.getLocation = function () {
            console.log("HI");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMapAtPosition);
            }
        };
        function initMap() {
            position = {coords: {latitude: -34.397, longitude: 150.644}};
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 4
                });
            console.log(map);
        };
        function initMapAtPosition(position){
            console.log(position);
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: {lat: position.coords.latitude,
                             lng: position.coords.longitude},
                    zoom: 12
                });
        }
    }

})();





