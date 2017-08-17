(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("fpController", fpController)

    function fpController($document, $routeParams, $window, $location,
                          profileService, userService, interestService){
        var model = this;

        model.message = "Edit your profile!";

        var userId = $routeParams['userId'];

        $window.model = model;
        model.profile = {};
        model.profile.photos = [];

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
            function randomOffset(){
                return 0.002*((new Date().getSeconds()*Math.random())%1)-0.01;
            }
            function round(value, decimals) {
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }
            function setMapPos(position){
                model.profile.lat = round(position.coords.latitude,2)+randomOffset();
                model.profile.lng = round(position.coords.longitude,2)+randomOffset();

                console.log(["Setting user location to", model.profile.lat, model.profile.lng ]);
            }
        };


        // Interests
        model.generateInterests = function(){
            model.interest = {label: model.bio,
                userId: userId};
            //connect to API to get interests
            interestService.generateInterests(model.interest)
                .then(function (response){
                    var interests = response.data["@graph"];
                    console.log(["updateBio...", interests]);

                    model.interests = [];
                    for (var i in interests){
                        var currentInterest = interests[i];

                        // The interest must be defined and not in list already.
                        console.log(["Pushing ", currentInterest.label]);
                        if((currentInterest.label) &&
                            (model.interests.indexOf(currentInterest.label) === -1)){
                            model.interests.push(currentInterest.label);
                        }
                    }

                    console.log(model.interests)
                })
        };


        // Some things must be executed at page load.
        function init(){
            console.log("fpController.")

            userService.getUser(userId)
                .then(function(response){
                    console.log("Here's the user:");
                    console.log(response.data);
                    model.user = response.data;
                    console.log("found user ");
                    console.log(model.user);
                    model.message = "Welcome, "+model.user.username+"!";
                    if(model.user === null){
                        console.log("User is null - going to login page!");
                        $location.url("/login");
                    }
                });

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





