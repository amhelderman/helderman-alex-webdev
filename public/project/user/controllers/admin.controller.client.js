(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("adminController", adminController)

    function adminController($document, $routeParams, $window, $location, userService){
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.message = "Welcome, user!";

        function init(){
            userService.checkLogin()
                .then(function (response){
                    console.log(["Account controller got user.", response.data]);
                    model.user = response.data;
                });
            console.log("adminController.");
            console.log("adminController finding user"+userId);
            // userService.getUser(userId)
            //     .then(function(response){
            //         model.user = response.data;
            //         if(model.user === null){
            //             console.log("User is null - going to login page!");
            //             $location.url("/login");
            //         }
            //     })
        }
        init();

    }

})();





