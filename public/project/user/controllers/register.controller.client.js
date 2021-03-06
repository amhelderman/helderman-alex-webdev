(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("registerController", registerController)

    function registerController($document, $window, $location, userService){
        var model = this;

        $window.model = model;
        model.message = "Welcome, user!";


        model.register = function(){
            console.log("Creating user111");
            console.log(model.user);
            userService.createUser(model.user).then(
                function(response){
                    console.log("got user");
                    console.log(response.data);
                    model.user = response.data;
                    $location.url("/user");
                }
            )

        }



        function init(){
            console.log("registerController.");
        }
        init();
    }

})();





