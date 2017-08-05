(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($location){
        var model = this;


        function init(){
            console.log("mapController.");
            createMap();

        }
        init();

        model.map = {};

        function getLocation() {
            console.log("HI");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMap);
            }
        }
        function initMap(position) {

            console.log("init map");
            console.log(position);
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: position.coords.latitude, lng: position.coords.longitude},
                zoom: 10
            });

            addMarker(position);
            function addMarker(position)
            {
                console.log("add marker");
                console.log(position);
                var marker = new google.maps.Marker({
                    position:  {lat: position.coords.latitude, lng: position.coords.longitude},
                    map: map,
                    title: 'Hello World!'
                });
            }
        }
        function createMap(){

            getLocation();

        }
    }

})();




