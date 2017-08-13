(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("fpController", fpController)

    function fpController($document, $routeParams, $window, $location, userService){
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.message = "Welcome, user!";
        model.profile = {};

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
            console.log("fpController.");
            // userService.getUser(userId)
            //     .then(function(response){
            //         console.log("Here's the user:");
            //         console.log(response.data);
            //         model.user = response.data;
            //         console.log("found user ");
            //         console.log(model.user);
            //         model.message = "Welcome, "+model.user.username+"!";
            //         if(model.user === null){
            //             console.log("User is null - going to login page!");
            //             $location.url("/login");
            //         }
            //     })
        }
        init();

    }

})();





