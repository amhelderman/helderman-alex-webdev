(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("accountController", accountController)

    function accountController($document, $routeParams, $window, $location, userService,profileService) {
        var model = this;

        var userId = $routeParams['userId'];

        $window.model = model;
        model.user = {};
        model.user.name = "User";
        model.message = "Welcome, user!";

        function init() {

            userService.checkLogin()
                .then(function (response) {
                    console.log(["Account controller got user.", response.data]);
                    model.user = response.data;

                    if(model.user == "0"){
                        $location.url("/login");
                    }


                    for(var f in model.user.usersFollowing){
                        profileService.getProfileByUser(model.user.usersFollowing[f])
                            .then(function(response){
                                model.profile = response.data;
                                if(model.message.firstName !== null){
                                    model.user.usersFollowing[f] = model.profile;
                                }
                            });
                    }
                })
        }

        init();

        model.goToProfile = function () {
            $location.url("/profile/" + model.user._id);
        };

        model.updateUser = function () {
            userService.updateUser(model.user._id, model.user);
        };
        model.deleteUser = function () {
            userService.deleteUser(model.user._id);
        };


    }

})();





