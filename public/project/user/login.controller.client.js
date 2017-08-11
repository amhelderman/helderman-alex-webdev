(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($document, $window, $location, userService){
        var model = this;

        $window.model = model;
        model.user = {};
        model.user.name = "User"

        function init(){
            console.log("loginController.");
        }
        init();

        model.loginFacebook = function(){
            userService.loginFacebook(getUserCallback);
            function getUserCallback(user){
                console.log("ALEX, callback returned user:");
                console.log(user);
                model.user = user;
            }
        }


        model.getPhotos = function(){
            console.log("GETTING PHOTOS");
            userService.getPhotos(model.user.id, getPhotosCallback);
            function getPhotosCallback(photos){
                console.log("ALEX, callback returned photos:");
                console.log(photos);
                model.user.photos = photos;
            }
        }

    }

})();





