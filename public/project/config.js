(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .config(configuration)

    function configuration($routeProvider){
        $routeProvider
            .when("/login",
                {
                    templateUrl: "user/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
            .otherwise({ redirectTo: '/'});

    }
})();





