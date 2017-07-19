/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($scope, $location, $routeParams,userService){
                $scope.hello = "hello from profile";

                var user= userService.findUserById($routeParams["userId"]);

                if(user == null)
                {
                    $scope.errorMessage = "cannot find user by this ID";
                }
    };

})();





