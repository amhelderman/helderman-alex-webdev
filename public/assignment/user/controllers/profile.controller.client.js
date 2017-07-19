/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($scope, $location){
                $scope.hello = "hello from profile";

                var users=[
                    {_id: "123", username: "alice", password: "alice"},
                    {_id: "124", username: "jerry", password: "jerry"}
                ];

                for(u in users)
                {
                    var currentUser = users[u];

                    /* TODO */
                    if(currentUser._id == $location)
                    {
                        // alert("changing to login");
                        $scope.user = currentUser;
                    }
                }

                $scope.userName =

                // When logging in...
                $scope.login = function(user){
                }
    };

})();





