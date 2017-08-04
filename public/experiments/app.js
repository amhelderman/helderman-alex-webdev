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
        model.message="HI";

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
            });
        }

        model.loginFacebook = function (){
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    model.accessToken = response.authResponse.accessToken;
                }
                else {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', function(response) {
                                console.log('Good to see you, ' + response.name + '.');
                            });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            });

        };

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


