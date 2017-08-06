(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location) {
        var model = this;

        function init() {
            console.log("mapController.");
            // createMap();

            if (typeof google !== 'undefined') {
                initMap();
            }
            else
            {
                mapService.then(initMap);
            }


        }

        init();

        model.map = {};

        model.getLocation = function () {
            console.log("HI");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMap);
            }
        };
        function initMap() {
            map = new google.maps.Map(
                document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 8
                });
            console.log(map);
        };
    }

})();





