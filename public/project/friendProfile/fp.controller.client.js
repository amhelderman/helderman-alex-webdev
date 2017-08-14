(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("fpController", fpController)

    function fpController($document, $routeParams, $window, $location, profileService){
        var model = this;

        model.message = "Edit your profile!";

        var userId = $routeParams['userId'];

        $window.model = model;
        model.profile = {};


        model.updateProfile = function(){
            console.log(["fpController updating profile ", model.profile._id, model.profile]);
            profileService.updateProfile(model.profile._id, model.profile)
                .then(function (response){
                    console.log(["fpController client update profile", response]);

                    if(response.statusText === "OK"){
                        model.message = "Profile has been updated.";
                    } else{
                        model.message = "Error - profile was not updated.";
                    }
                });
        };

        model.getUserLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setMapPos);
            }
            function setMapPos(position){
                model.profile.lat = position.coords.latitude;
                model.profile.lng = position.coords.longitude;

                console.log(["Setting user location to", model.profile.lat, model.profile.lng ]);
            }
        };
        function init(){
            console.log("fpController.")

            profileService.getProfileByUser(userId)
                .then(function(response){
                    model.profile = response.data;
                    console.log(["getProfileByUser yields profile: ", model.profile]);
                    console.log(["IS THIS AN ID?", model.profile._id]);

                    if(model.message.firstName !== null){
                        model.message = "Welcome, "+model.profile.firstName+"!";
                    }
                })
        }
        init();

    }

})();





