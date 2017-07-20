/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($location, $routeParams,userService){
        var model = this;

        model.user;
        model.updateUser = updateUser;
        model.unregister = unregister;

        function init()
        {
            user = userService.findUserById($routeParams["userId"]);

            model.hello = "hello from profile";


            if(user == null)
            {
                model.errorMessage = "cannot find user by this ID";
            }
        }
        init();

        function updateUser()
        {
            alert("update user");
        }
        function unregister(){
            alert(" unreg user");

        }
    };



})();





