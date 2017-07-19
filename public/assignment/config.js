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
                        .when("/login",
                            {
                                templateUrl: "user/templates/login.html"
                            })
                        .when("/profile",
                            {
                                templateUrl: "user/templates/profile.html"
                            })
                        // .when("/:pageName",
                        //     {
                        //         /* template URL can be a function:
                        //          https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
                        //          */
                        //         templateUrl: function (params) {
                        //             return "index.html#!" + params.pageName + '.html';
                        //         }
                        //     })
    }


})();





