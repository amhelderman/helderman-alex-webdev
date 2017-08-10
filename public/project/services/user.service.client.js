/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($window, $http)
    {

        var users= [
            {username: "po", password: "po", facebookUser: {}}
        ];


    }
})();