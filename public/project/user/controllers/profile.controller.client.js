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
        model.message = "Welcome, user!";

        function init(){
            console.log("profileController.");
            console.log("profileController finding user"+userId);
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
                })
        }
        init();


        model.updateUser = function(){
            console.log("Profile Controller - client - updateUser ");
            userService.updateUser(model.user._id, model.user);
        };
        model.deleteUser = function(){
            console.log("Profile Controller - client - deleteUser ");
            userService.deleteUser(model.user._id);
        };
        // model.getUserLocation = function(){
        //     console.log("Profile Controller - client - getUserLocation ");
        //     function setUserLocation(position){
        //         model.user.latitude = round(position.coords.latitude,3);
        //         model.user.longitude= round(position.coords.longitude,3);
        //         console.log(model.user.latitude, model.user.longitude]);
        //         console.log(model.user);
        //     }
        //     function round(value, decimals) {
        //         return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        //     }
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(setUserLocation);
        //     }
        // };

    }

})();





