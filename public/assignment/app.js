/**
 * Created by Alex on 7/17/17.
 */


var app = angular.module("WamApp", ["ngRoute"]);


/* Routing*/
app.config(Config);
app.controller("loginController", loginController);
app.controller("profileController", profileController);

function Config($routeProvider)
{
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
};


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
                $location.url("#!/register");
            }
        }
        $scope.errorMessage = "User not found";
    }
}

function profileController($scope, $location){

    $scope.hello = "hello from profile";

    var users=[
        {_id: "123", username: "alice", password: "alice"},
        {_id: "124", username: "jerry", password: "jerry"}
    ];


    // When logging in...
    $scope.login = function(user){
        for( var u in users){
            var currentUser = users[u];
            if(currentUser.username === $scope.user.username & currentUser.password === $scope.user.password)
            {
                // $scope.welcomeUser = currentUser;
                $location.url("profile");
                $location.url("profile/"+currentUser.username);
            }
        }
        $scope.errorMessage = "User not found";
    }


}




