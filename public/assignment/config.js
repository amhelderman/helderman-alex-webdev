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
                                templateUrl: "user/templates/login.view.client.html",
                                controller: "loginController",
                                controllerAs: "model"
                            })
                        .when("/register",
                            {
                                templateUrl: "user/templates/register.view.client.html",
                                controller: "registerController",
                                controllerAs: "model"
                            })
                        .when("/profile/:uid",
                            {
                                templateUrl: "user/templates/profile.view.client.html#!/:uid",
                                controller: "profileController",
                                controllerAs: "model"
                            })
        // website routes
                        .when("/website/:userId/list",
                            {
                                templateUrl:"website/templates/website-list.view.client.html",
                                controller: "websiteListController",
                                controllerAs: "model"
                            })
                        .when("/website/:userId/new",
                            {
                                templateUrl:"website/templates/website-new.view.client.html",
                                controller: "websiteNewController",
                                controllerAs: "model"
                            })
                        .when("/website/:userId/edit",
                            {
                                templateUrl:"website/templates/website-edit.view.client.html",
                                controller: "websiteListController",
                                controllerAs: "model"
                            })
    }


})();





