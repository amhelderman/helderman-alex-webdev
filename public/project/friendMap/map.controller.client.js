(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("mapController", mapController)

    function mapController($scope, $window, $location, mapService, profileService) {
        var model = this;

        // $window.model = model;
        model.map = {};
        model.mapPosition = {lat: 42.35, lng: -71.08};
        model.locations = [];


        init();
        function init() {
            console.log("mapController.");

            var myLatLng = getUserLocation();
            var mapDiv = document.getElementById('map');

            mapService.init(mapDiv, myLatLng, setProfileCallback, mapsGoToProfileCallback, mapClickCallback);
        }

        function getUserLocation () {
            console.log("HI");
            var location ={lat: 42.35, lng: -71.08};
            if (navigator.geolocation) {
                navigator.geolocation
                    .getCurrentPosition(function (position){
                        location = {lat: position.coords.latitude,
                            lng: position.coords.longitude}
                    });
            }
            return location;
        }

        function setProfileCallback(profile){
            console.log("Hey, you're checking out "+profile.firstName+"'s profile.");
            model.profile = profile;
            $scope.$digest();
        }
        function mapsGoToProfileCallback(profile){
            console.log(["Going to profile...", profile]);
            $location.url("/profile/"+profile.userId);
            $scope.$digest(); // see if window isnt required...
            $window.location.assign("#!/profile/"+profile.userId);
        }
        function mapClickCallback(){
            model.profile = null;
            $scope.$digest();
        }

    }

})();





