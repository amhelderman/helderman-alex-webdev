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
                        .when("/website/:userId/:webId/edit",
                            {
                                templateUrl:"website/templates/website-edit.view.client.html",
                                controller: "websiteEditController",
                                controllerAs: "model"
                            })
        // page routes
                        .when("/page/:userId/:webId/list",
                            {
                                templateUrl:"page/templates/page-list.view.client.html",
                                controller: "pageListController",
                                controllerAs: "model"
                            })
                        .when("/page/:userId/:webId/new",
                            {
                                templateUrl:"page/templates/page-new.view.client.html",
                                controller: "pageNewController",
                                controllerAs: "model"
                            })
                        .when("/page/:userId/:webId/:pageId/edit",
                            {
                                templateUrl:"page/templates/page-edit.view.client.html",
                                controller: "pageEditController",
                                controllerAs: "model"
                            })
        // widget routes
                        .when("/widget/:userId/:webId/:pageId/list",
                            {
                                templateUrl:"widget/templates/widget-list.view.client.html",
                                controller: "widgetListController",
                                controllerAs: "model"
                            })
                        .when("/widget/:userId/:webId/:pageId/chooser",
                            {
                                templateUrl:"widget/templates/widget-chooser.view.client.html",
                                controller: "widgetChooserController",
                                controllerAs: "model"
                            })
                        .when("/widget/:userId/:webId/:pageId/:widgetId/edit",
                            {
                                templateUrl:"widget/templates/widget-edit.view.client.html",
                                controller: "widgetEditController",
                                controllerAs: "model"
                            })
                        // Widget edits for each type:
                        .when("/widget/:userId/:webId/:pageId/:widgetId/heading-edit",
                            {
                                templateUrl:"widget/templates/edit/widget-heading-edit.view.client.html",
                                controller: "widgetEditController",
                                controllerAs: "model"
                            })
                        .when("/widget/:userId/:webId/:pageId/heading",
                            {
                                templateUrl:"widget/templates/widget-list.view.client.html",
                                controller: "widgetListController",
                                controllerAs: "model"
                            })



    }


})();





