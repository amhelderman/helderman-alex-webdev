/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)



    function loginController($scope, $location, userService){
                $scope.hello = "hello from loginController";


                // When logging in...
                $scope.login = function(user){


                    var user = userService.findUserByUsernameAndPassword(user.username, user.password);
                    if(user == null)
                    {
                        $scope.errorMessage = "user not found";

                    }
                    else {
                        $location.url("profile/"+user._id);
                    }
                }
    };

})();





