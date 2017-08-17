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
                })
            .when("/register",
                {
                    templateUrl: "user/views/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model",
                    resolve: {
                        qweqweqwe: checkLoggedIn
                    }
                })
            .when("/user/:userId",
                {
                    templateUrl: "user/views/account.view.client.html",
                    controller: "accountController",
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
            .when("/interest/:userId",
                {
                    templateUrl: "interest/interest.view.client.html",
                    controller: "interestController",
                    controllerAs: "model"
                })
            .when("/interest-detail/:interestLabel",
                {
                    templateUrl: "interest/interest-detail.view.client.html",
                    controller: "interestDetailController",
                    controllerAs: "model"
                })
            .otherwise({ redirectTo: '/'});

    }

    function checkLoggedIn($q,  userService){
        var deferred = $q.defer();
        userService.checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.reject();
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkIsAdmin($q, $http, $location, $rootscope){
        var deferred = $q.defer();

        $http.get('/ratemyfriend/api/loggedin')
            .then(function (user){
                if(user !== '0'){
                    $rootscope.currentUser = user;
                    deferred.resolve();
                } else{
                    $rootscope.currentUser = null;
                    deferred.reject();
                    $location.url("/");
                }
            })
    }




})();

