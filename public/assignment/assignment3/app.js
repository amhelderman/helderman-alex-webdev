/**
 * Created by Alex on 7/17/17.
 */


var app = angular.module("WamApp", ["ngRoute"]);


/* Configure ngRoute */

app.config(configuration);


function configuration($routeProvider)
{
    alert("configuration");
    $routeProvider
        .when("/login", {templateURL: "login.html"})
        .when("/profile", {templateURL: "profile.html"})
        .when("/register", {templateURL: "register.html"});
}



/* Define the loginController */

app.controller("loginController", loginController);



function profileController($scope, $location){


}




function loginController($scope, $location){

    $scope.hello = "hello from loginController";

    var users=[
            {_id: "123", username: "alice", password: "alice"},
            {_id: "124", username: "jerry", password: "jerry"}
    ];


    // When logging in...
    $scope.login = function(user){
        alert(user.username);
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
        alert($scope.user.username);
        alert($scope.user.password);
    }

}


