/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .config(configuration)
        .controller("loginController", loginController)
        .controller("profileController", profileController);


    function configuration($routeProvider){
                    $routeProvider
                        .when("/:pageName",
                            {
                                /* template URL can be a function:
                                 https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
                                 */
                                templateUrl: function (params) {
                                    return params.pageName + '.html';
                                }
                            })
    }

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





