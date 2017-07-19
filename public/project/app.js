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







/* GEO LOCATION */
// function initMap() {
//     var uluru = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         center: uluru
//     });
//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });
// }
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
//
//
// var x = document.getElementById("demo");
//
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
//
// function showPosition(position) {
//     var latlon = position.coords.latitude + "," + position.coords.longitude;
//     //             http://maps.googleapis.com/maps/api/service/output?parameters
//     var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
//         +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyApxo8W1f-xebWiMEjYMyphOI5eUHxu8pg";
//     document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
// }
// //To use this code on your website, get a free API key from Google.
// //Read more at: https://www.w3schools.com/graphics/google_maps_basic.asp
//
// function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             x.innerHTML = "User denied the request for Geolocation."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML = "Location information is unavailable."
//             break;
//         case error.TIMEOUT:
//             x.innerHTML = "The request to get user location timed out."
//             break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML = "An unknown error occurred."
//             break;
//     }
// }