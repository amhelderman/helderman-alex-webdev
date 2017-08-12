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
            console.log("found user "+model.user);
        }
        init();

    }

})();





