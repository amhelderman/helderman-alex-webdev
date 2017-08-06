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
            function checkVariable() {
                console.log(typeof google);
                if (typeof google !== 'undefined') {
                    map = new google.maps.Map(
                        document.getElementById('map'), {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 8
                        });
                    console.log(map);
                }
            }

            setTimeout(checkVariable, 1000);
        };
    }

})();





