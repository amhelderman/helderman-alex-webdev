/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($window, $http)
    {
        this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;
        this.findUserById = findUserById;
        this.registerUser = registerUser;
        this.unregisterUser = unregisterUser;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;


        this.loginFacebook = loginFacebook;
        this.logoutFacebook = logoutFacebook;
        this.shareFacebook = shareFacebook;

        var FB = $window.FB;

        function logoutFacebook () {
            FB.logout(function (response) {
                // user is now logged out
                console.log("User is logged out");
                console.log(response);
                model.user = null;
            });
        }

        function loginFacebook (callbackFn){
            console.log("logging in...");

            // Returned at end
            var user = {};


            if(!FB){
                console.log("FB is not defined yet.");
                return;
            }

            FB.getLoginStatus(loginConnected);

            function loginConnected(response){
                console.log("loginConnected");
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    user.accessToken = response.authResponse.accessToken;
                }
                else {
                    console.log("Not logged in yet, so logging in now.");
                    FB.login(loginResponse,  {scope: 'public_profile, user_photos'});
                }
            }
            function loginResponse(response){
                if (response.authResponse) {
                    console.log(response.authResponse);
                    FB.api('/me', loginSuccessCallback);

                    user.accessToken = response.authResponse.accessToken;
                }
                else {
                    console.log('Login failed.');
                }
            }
            function loginSuccessCallback(response){
                console.log('Good to see you, ' + response.name + '.');
                user.id = response.id;
                user.name = response.name;

                FB.api("https://graph.facebook.com/"+user.id+"/picture",
                    function(response) {
                        console.log("Got profile picture")
                        user.profilePicture = response.data.url;
                        callbackFn(user);
                    });
            }
        }

        function getFacebookPhotos(fbId){
            console.log("Getting photos for user "+fbId);

            var photos = [];

            FB.api("https://graph.facebook.com/"+fbId+"/photos",
                function(response){
                    console.log("Got photos:");
                    var photoInfo = response.data;
                    for(var p in photoInfo){
                        var currentPhoto = photoInfo[p];

                        FB.api('/'+currentPhoto.id+"?fields=images  ",
                            function(response){
                                photos.push(response.images[0]);
                                console.log(photos);
                            });
                    }
                });
        }

        function shareFacebook (){
            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object:'https://developers.facebook.com/docs/',
                })
            }, function(response){
                // Debug response (optional)
                console.log(response);
            });
        }


        ///////////////////////

        function registerUser(user)
        {
            /* Handle user check at client level */
            console.log("user service: registering user "+user.username);
        }

        function unregisterUser(userId)
        {
            console.log("user service: deleting user "+userId);
        }

        function updateUser(userId, user)
        {
            console.log("user service: updating user "+userId);
        }


        function findUserById(userId)
        {
            console.log("user service: finding user by id "+userId);
        }

        function findUserByUsernameAndPassword(username, password)
        {
            console.log("in user service for findUserByUsernameAndPassword");
        }


        function findUserByUsername(username)
        {
            console.log("user service: finding user "+username);
        }

    }
})();