(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("accountController", accountController)

    function accountController($document, $routeParams, $window, $location, userService){
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.message = "Welcome, user!";

        function init(){
            // console.log(["Account trying to get user using id ", userId]);
            // userService.getUser(userId)
            //     .then(function(response){
            //         model.user = response.data;
            //         console.log(["Account controller checking login status", model.user]);
            //         if(model.user) {
            //             console.log(["Account Controller - getUser: ", model.user]);
            //             model.message = "Welcome, " + model.user.username + "!";
            //         }else{
            //             $location.url("/login");
            //         }
            //     })
            userService.checkLogin()
                .then(function (user){
                    console.log(["Account controller got user.", user]);
                    model.user = user;
                })
        }
        init();

        model.goToProfile = function(){
            $location.url("/profile/"+model.user._id);
        };

        model.updateUser = function(){
            userService.updateUser(model.user._id, model.user);
        };
        model.deleteUser = function(){
            userService.deleteUser(model.user._id);
        };
    }

})();





