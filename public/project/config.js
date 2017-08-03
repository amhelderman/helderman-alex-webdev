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
                    templateUrl: "index.html",
                    controller: "indexController",
                    controllerAs: "model"
                })
            .when("/job",
                {
                    templateUrl: "job/job.html",
                    controller: "jobController",
                    controllerAs: "model"
                })
            .when("/home",
                {
                    templateUrl: "home/home.html",
                    controller: "homeController",
                    controllerAs: "model"
                })
            .when("/experiments",
                    {
                        templateUrl: "experiment/index.html",
                        controller: "ajController",
                        controllerAs: "model"
                    })


    }


})();





