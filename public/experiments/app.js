/**
 * Created by Alex on 8/3/17.
 */



(function (){

    angular
        .module("ajApp", ["ngRoute"])
        .controller("ajController", ajController)
        .service("jobService", jobService);


    function jobService($http)
    {
        // this.getJobTypes = getJobTypes;
        // this.deletePage = deletePage;
        //
        // function getJobTypes(){
        //     var url = "https://authenticjobs.com/api/?api_key=2f9cf88dada5697e6eda2c4e8855ccc7&method=aj.types.getlist";
        //     console.log("getJobTypes");
        //     console.log(url);
        //     return $http.get(url);
        // }
        // function deletePage(userId, websiteId, pageId){
        //     var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
        //     console.log("page service: deleting page using url:");
        //     console.log(url);
        //     return $http.delete(url);
        // }

    }

    function ajController($location, jobService){
        var model = this;

        model.accessToken = null;
        model.user = {};

        model.nums = [1, 2, 3, 4, 5];


        // model.url = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13606607_1"+
        // "489462927745831_321545280577124328_n.jpg?oh=104aa2fe95"+
        // "2e9d87bffc7762b26bb99d&oe=5A2EA57E";
        function init(){

            // jobService.getJobTypes()
            //     .then(function(response){
            //         console.log(response);
            //         model.message = response.data;
            //     })
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

        model.logoutFacebook = function(){
            FB.logout(function(response) {
                // user is now logged out
                console.log("User is logged out");
                console.log(response);
                model.user = null;
            });
        }

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


