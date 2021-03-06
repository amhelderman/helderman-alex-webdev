(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("fpController", fpController)

    function fpController($document, $scope, $routeParams, $window, $location,
                          profileService, userService, interestService){
        var model = this;

        model.message = "Edit your profile!";

        var userId = $routeParams['userId'];

        $window.model = model;
        model.profile = {};
        model.profile.photos = [];

        model.followUser = function(){
            console.log(["Following user", userId])
            userService.followUser(userId);
        }

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

            model.generateInterests();
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


        model.goToInterest = function(interest){
            var encodedLabel = encodeURIComponent(interest.label);
            var url = "/interest-detail/" + encodedLabel;
            console.log(["going to url", url]);
            $location.url(url);
        };

        // Interests
        model.generateInterests = function(){
            model.interest = {label: model.profile.bio,
                                userId: userId};
            //connect to API to get interests
            interestService.generateInterests(model.interest)
                .then(function (response){
                    var interests = response;
                    console.log(["updateBio...", interests]);

                    model.interests = [];
                    for (var i in interests){
                        var currentInterest = interests[i];

                        // The interest must be defined and not in list already.
                        console.log(["Pushing ", currentInterest.label]);
                        if((currentInterest.label) &&
                            (model.interests.indexOf(currentInterest.label) === -1)){
                            model.interests.push(currentInterest);
                        }
                    }

                    console.log(model.interests)
                })
        };


        // Facebook Photos:
        function getFacebookPhotos(){
            fbService.loginFacebook()
                .then(function(response){
                    console.log(["getFacebookPhotos", response]);
                })
        }

        // Some things must be executed at page load.
        function init(){
            console.log("fpController.")

            userService.checkLogin()
                .then(function (response){
                    console.log(["Account controller got user.", response.data]);
                    model.user = response.data;
                });
            userService.getUser(userId)
                .then(function(response){
                    model.viewedUser = response.data;
                    console.log(["Account controller checking login status", model.user]);
                    if(model.viewedUser) {
                        console.log(["Account Controller - getUser: ", model.viewedUser]);
                        model.message = "Welcome, " + model.viewedUser.username + "!";
                    }else{
                        $location.url("/login");
                    }
                })

            profileService.getProfileByUser(userId)
                .then(function(response){
                    model.profile = response.data;
                    if(model.message.firstName !== null){
                        model.message = "Welcome, "+model.profile.firstName+"!";

                        model.profileIsUsers = (model.user._id === model.profile.userId);
                    }
                });


            interestService.getInterestsByUser(userId)
                .then(function(response){
                    console.log(["interestService getting interests from user",
                        response.data])
                    model.interests = response.data;
                });

        }
        init();

    }

})();





