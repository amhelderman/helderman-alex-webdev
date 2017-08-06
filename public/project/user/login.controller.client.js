(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($document, $window, $location, userService){
        var model = this;

        $window.model = model;


        function init(){
            console.log("loginController.");
            userService.loadScript($document,function(){
                console.log("ALEX");

                FB.init({
                    appId      : 852027658298964,
                    xfbml      : true,
                    version    : 'v2.1'
                });

            });
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





