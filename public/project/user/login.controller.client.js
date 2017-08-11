(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location, userService){
        var model = this;

        function init(){
            alert("loginController.");

            userService.facebookSetup();

            userService.loginFacebook(getUser);

            function getUser(user){
                console.log("ALEX, callback returned user:");
                console.log(user);
            }
        }
        init();

    }

})();





