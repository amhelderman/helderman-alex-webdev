(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($document, $window, $location, userService){
        var model = this;

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.user.loggedIn = false;
        model.message = "Welcome, user!";

        function init(){
            console.log("loginController.");
        }
        init();

        model.goToProfile = function(){
            if(model.user.loggedIn === false){
                model.message = "Please log in.";
                $location.url("/login");
            } else{
                model.message = "Welcome to your profile, "+model.user.username;
                var u = "/profile/"+ model.user._id;
                $location.url(u);
            }
        };

        model.login = function(){
            console.log("Log in");
            var credentials = {username: model.user.username,
                password: model.user.password};
            userService.login(credentials).then(
                function(response){
                    console.log("got user");
                    console.log(response.data);
                    model.user = response.data;
                    if(model.user === null){
                        console.log("User is not found");
                        model.message = "User not found.";
                    } else{
                        console.log("User is not found");
                        model.message = "Logged in as "+model.user.username+"!";
                        $location.url("/profile/"+model.user._id);
                    }
                }
            )
        };


        model.getPhotos = function(){
            console.log("GETTING PHOTOS");
            userService.getPhotos(model.user.id, getPhotosCallback);
            function getPhotosCallback(photos){
                console.log("ALEX, callback returned photos:");
                console.log(photos);
                model.user.photos = photos;
            }
        };

    }

})();





