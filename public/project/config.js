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
                    templateUrl: "user/views/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                    resolve:{
                        loggedin: checkLoggedIn
                    }
                })
            .when("/register",
                {
                    templateUrl: "user/views/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
            .when("/user/:userId",
                {
                    templateUrl: "user/views/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"
                })
            .when("/profile/:userId",
                {
                    templateUrl: "friendProfile/friendProfile.html",
                    controller: "fpController",
                    controllerAs: "model"
                })
            .when("/map",
                {
                    templateUrl: "friendMap/map.view.client.html",
                    controller: "mapController",
                    controllerAs: "model"
                })
            .when("/maptest",
                {
                    templateUrl: "friendMap/mapSearch.html",
                    controller: "mapSearchController",
                    controllerAs: "model"
                })
            .otherwise({ redirectTo: '/'});

    }
})();


function checkLoggedIn($q, $http, $location, $rootscope){
    var deferred = $q.defer();

    $http.get('/ratemyfriend/api/loggedin')
        .then(function (user){
            if(user != '0'){
                $rootscope.currentUser = user;
                deferred.resolve();
            } else{
                $rootscope.currentUser = null;
                deferred.reject();
                $location.url("/login");
            }
        })
}


function checkIsAdmin($q, $http, $location, $rootscope){
    var deferred = $q.defer();

    $http.get('/ratemyfriend/api/loggedin')
        .then(function (user){
            if(user != '0'){
                $rootscope.currentUser = user;
                deferred.resolve();
            } else{
                $rootscope.currentUser = null;
                deferred.reject();
                $location.url("/login");
            }
        })
}



