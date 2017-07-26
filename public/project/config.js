/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .config(configuration)


    function configuration($routeProvider){
                    $routeProvider
                        .when("/",
                            {
                                templateUrl: "user/templates/login.view.client.html",
                                controller: "loginController",
                                controllerAs: "model"
                            })
                        .when("/login",
                            {
                                templateUrl: "login.view.client.html",
                                controller: "loginController",
                                controllerAs: "model"
                            })

    }


})();





