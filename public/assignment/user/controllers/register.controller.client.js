/**
 * Created by Alex on 7/19/17.
 */
/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController($location, $routeParams, userService){
        var model = this;
        model.registerUser = registerUser;

        function registerUser(user)
        {
            console.log("register user");
            if(user.password === user.password2)
            {
                console.log(user);
                var user = userService.registerUser(user);
            }
            else
            {
                model.errorMessage = "Passwords do not match.";
            }
        }

        function init()
        {

        }
        init();
    };



})();





