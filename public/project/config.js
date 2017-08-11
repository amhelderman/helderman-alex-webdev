(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .config(configuration)

    function configuration($routeProvider){
        $routeProvider
            .when("/",
                {
                    templateUrl: "friendMap/map.view.client.html",
                    controller: "mapController",
                    controllerAs: "model"
                })
            .when("/login",
                {
                    templateUrl: "user/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
            .when("/map",
                {
                    templateUrl: "friendMap/map.view.client.html",
                    controller: "mapController",
                    controllerAs: "model"
                })
            .otherwise({ redirectTo: '/'});

    }
})();





