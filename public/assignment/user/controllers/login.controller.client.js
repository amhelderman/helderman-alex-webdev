/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)


    function loginController($scope, $location){
                $scope.hello = "hello from loginController";


                // When logging in...
                $scope.login = function(user){
                    var users=[
                        {_id: "123", username: "alice", password: "alice"}
                    ];
                    for( var u in users){
                        var currentUser = users[u];
                        if(currentUser.username === $scope.user.username & currentUser.password === $scope.user.password)
                        {
                            // alert("changing to login");
                            $location.url("profile/"+currentUser._id);
                        }
                    }
                    $scope.errorMessage = "User not found";
                    $scope.userName = currentUser.username;
                }
    };

})();





