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
                                templateUrl: "user/templates/login.view.client.html",
                                controller: "loginController",
                                controllerAs: "model"
                            })
                        .when("/profile",
                            {
                                templateUrl: "user/templates/profile.view.client.html",
                                controller: "profileController",
                                controllerAs: "model"
                            })
                        .when("/register",
                            {
                                templateUrl: "user/templates/register.view.client.html",
                                controller: "registerController",
                                controllerAs: "model"
                            })
                        .when("/website-edit",
                            {
                                templateUrl: "website/templates/edit.view.client.html"
                            })
                        .when("/website-new",
                            {
                                templateUrl: "website/templates/new.view.client.html"
                            })
                        .when("/website-list",
                            {
                                templateUrl: "website/templates/list.view.client.html"
                            })
                        .when("/profile",
                            {
                                templateUrl: "user/templates/profile.view.client.html"
                            })
                        .when("/profile/:iud",
                            {
                                templateUrl: "user/templates/profile.view.client.html#!/:uid"
                            })
                        .when("/profile",
                            {
                                templateUrl: "user/templates/profile.view.client.html"
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





