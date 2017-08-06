/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($window, $http)
    {
        this.loginFacebook = loginFacebook;
        this.logoutFacebook = logoutFacebook;
        this.shareFacebook = shareFacebook;
        this.loadScript = loadScript;


        function loadScript(d, cb) {
            console.log(d);
            console.log(cb);
            var scriptOb = $("<script>")
            scriptOb
                .attr("class", "amhhhh")
                .attr("async", true)
                .attr("source", "//connect.facebook.net/en_US/all.js" )
                .attr("onreadystatechange",function() {
                        console.log("HELLO!");
                        if (this.readyState == "complete") {
                            console.log("HELLO!2");
                            cb();
                        }
                    } );
            $(d.documentElement).append(scriptOb);
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

    }
})();