/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($http)
    {
        this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;
        this.findUserById = findUserById;
        this.registerUser = registerUser;
        this.unregisterUser = unregisterUser;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;


        this.facebookSetup = facebookSetup;
        this.loginFacebook = loginFacebook;
        this.logoutFacebook = logoutFacebook;
        this.shareFacebook = shareFacebook;

        function facebookSetup(){
            window.fbAsyncInit = function() {
                FB.init({
                    appId            : 852027658298964,
                    autoLogAppEvents : true,
                    xfbml            : true,
                    version          : 'v2.10'
                });
                FB.AppEvents.logPageView();

            };
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }

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

            FB.getLoginStatus(loginConnected);

            function loginConnected(response){
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    user.accessToken = response.authResponse.accessToken;
                }
                else {
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