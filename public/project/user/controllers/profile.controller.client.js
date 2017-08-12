(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($document, $routeParams, $window, $location, userService){
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.user = {};
        model.user.name = "User";

        function init(){
            console.log("profileController.");
            model.user = userService.getUser(userId);
            console.log("found user ");
            console.log(model.user);
        }
        init();


        model.updateUser = function(){
            console.log("Profile Controller - client - updateUser ");
            userService.updateUser(model.user._id, model.user);
        };
        model.getUserLocation = function(){
            console.log("Profile Controller - client - getUserLocation ");
            function setUserLocation(position){
                console.log(position);
                model.user.profile.location = {latitude: position.coords.latitude,
                                                longitude: position.coords.longitude};
                console.log(model.user);
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setUserLocation);
            }
        };

    }

})();




