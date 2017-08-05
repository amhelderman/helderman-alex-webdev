(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location){
        var model = this;

        function init(){
            alert("loginController.");

            facebookSetup();
        }
        init();


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

        model.logoutFacebook = function() {
            FB.logout(function (response) {
                // user is now logged out
                console.log("User is logged out");
                console.log(response);
                model.user = null;
            });
        };

        model.loginFacebook = function (){
            console.log("logging in...");
            FB.getLoginStatus(loginConnected);
        };

        function loginConnected(response){
            if (response.status === 'connected') {
                console.log('Logged in.');
                model.accessToken = response.authResponse.accessToken;
            }
            else {
                FB.login(loginResponse,  {scope: 'public_profile, user_photos'});
            }
        }

        function loginResponse(response){
            if (response.authResponse) {
                console.log(response.authResponse);
                FB.api('/me', loginSuccessCallback);

                model.accessToken = response.authResponse.accessToken;
            }
            else {
                console.log('Login failed.');
            }
        }

        function loginSuccessCallback(response){
            console.log('Good to see you, ' + response.name + '.');
            model.user = {};
            model.user.id = response.id;
            model.user.name = response.name;

            FB.api("https://graph.facebook.com/"+model.user.id+"/picture", getProfilePicture);

        }

        function getProfilePicture(response) {
            console.log("Got profile picture")
            model.user.profilePicture = response.data.url;
            console.log(model.user.profilePicture);
            model.loginFacebook();
            getPhotos();
        }

        function getPhotos(response) {
            console.log("Getting photos");

            FB.api("https://graph.facebook.com/"+model.user.id+"/photos",
                function(response){
                    console.log("Got photos:");
                    model.user.photoInfo = response.data;
                    model.user.photos = [];
                    for(var p in model.user.photoInfo){
                        var currentPhoto = model.user.photoInfo[p];

                        FB.api('/'+currentPhoto.id+"?fields=images  ",
                            function(response){
                                model.user.photos.push(response.images[0]);
                                console.log(model.user.photos);
                            });
                    }
                });

        }




        model.shareFacebook = function (){
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
        };
    }

})();





