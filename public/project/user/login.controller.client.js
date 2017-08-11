(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location, userService){
        var model = this;

        function init(){
            console.log("loginController.");

            // userService.facebookSetup();

        }
        init();

        model.loginFacebook = function(){

            userService.loginFacebook(getUser);

            function getUser(user){
                console.log("ALEX, callback returned user:");
                console.log(user);
            }
        }

    }

})();





