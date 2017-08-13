(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("fpController", fpController)

    function fpController($document, $routeParams, $window, $location, profileService){
        var model = this;

        model.message = "Edit your profile!";

        var userId = $routeParams['userId'];
        var profileId = null

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.message = "Welcome, user!";
        model.profile = {};


        model.updateProfile = function(){
            console.log("HELLO");
            console.log(["fpController updating profile ", profileId, model.profile]);
            profileService.updateProfile(profileId, model.profile)
                .then(function (response){
                    console.log(["fpController client update profile", response]);
                    model.profile = response;
                });
        };

        model.getUserLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setMapPos);
            }
            function setMapPos(position){
                model.profile.location = {lat: position.coords.latitude,
                                        lng: position.coords.longitude};
                console.log(["Setting user location to", model.profile.location ]);
            }
        };
        function init(){
            console.log("fpController.")

            profileService.getProfileByUser(userId)
                .then(function(response){
                    console.log(["getProfileByUser result", response]);
                    profileId = response.data;
                })
        }
        init();

    }

})();





