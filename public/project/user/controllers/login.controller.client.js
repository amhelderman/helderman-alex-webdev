(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($document, $window, $location, userService){
        var model = this;

        $window.model = model;
        model.message = "Welcome, user!";

        function init(){
            console.log("loginController.");
        }
        init();

        model.goToProfile = function(){
            if(model.user.loggedIn === false){
                model.message = "Please log in.";
                $location.url("/login");
            } else{
                model.message = "Welcome to your profile, "+model.user.username;
                var u = "/user/"+ model.user._id;
                $location.url(u);
            }
        };

        model.login = function(){
            userService.login(model.user).then(
                function(response){
                    model.user = response.data;
                    if(!model.user){
                        console.log(["Login Failure:", model.user]);
                        model.message = "User not found.";
                    } else{
                        console.log(["Login Success:", model.user]);
                        model.message = "Logged in as "+model.user.username+"!";
                        $location.url("/user/"+model.user._id);
                    }
                }
            )
        };


    }

})();





