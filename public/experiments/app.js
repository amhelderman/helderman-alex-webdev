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
                model.id = null;
            });
        }

        model.loginFacebook = function (){
            // model.url = 'https://farm9.staticflickr.com/8455/8048926748_1bc624e5c9_d.jpg';\
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    model.accessToken = response.authResponse.accessToken;
                }
                else {
                    FB.login(loginResponse);
                }
            });
        };

        function loginResponse(response){
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', loginSuccessCallback);

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }

        function loginSuccessCallback(response){
            console.log('Good to see you, ' + response.name + '.');
            console.log(response);
            model.id = response.id;
            model.name = response.name;

            model.url = "//graph.facebook.com/"+model.id+"/picture";
            // FB.api("/"+model.id+"/picture",getProfilePicture);
            FB.api("https://graph.facebook.com/"+model.id+"/picture", getProfilePicture);
        }

        function getProfilePicture(response) {
                /* handle the result */
                console.log("Got profile picture")
                model.profilePicture = response.data.url;
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


