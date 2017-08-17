(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("accountController", accountController)

    function accountController($document, $routeParams, $window, $location, userService){
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.message = "Welcome, user!";

        function init(){
            console.log("accountController.");
            console.log("accountController finding user"+userId);
            userService.getUser(userId)
                .then(function(response){
                    model.user = response.data;
                    model.message = "Welcome, "+model.user.username+"!";
                    if(model.user === null){
                        console.log("User is null - going to login page!");
                        $location.url("/login");
                    }
                })
        }
        init();

        model.goToProfile = function(){
            $location.url("/profile/"+model.user._id);
        };

        model.updateUser = function(){
            console.log("accountController  - client - updateUser ");
            userService.updateUser(model.user._id, model.user);
        };
        model.deleteUser = function(){
            console.log("accountController  - client - deleteUser ");
            userService.deleteUser(model.user._id);
        };
    }

})();





