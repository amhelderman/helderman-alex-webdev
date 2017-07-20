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

    function registerController($location, $routeParams,userService){
        var model = this;
        model.registerUser = registerUser;

        function registerUser(user)
        {

            console.log("register user");
            console.log(user);

            var user = userService.registerUser(user);
        }

        function init()
        {

        }
        init();
    };



})();





