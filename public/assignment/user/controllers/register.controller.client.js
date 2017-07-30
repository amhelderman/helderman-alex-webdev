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
            if(user.password === model.verifyPassword)
            {
                console.log("Passwords match. Registering user:");
                console.log(user);
                var promise = userService.registerUser(user);
                promise.then(function(response){
                        console.log("Registering user resulted in:");
                        console.log(response.data);
                        $location.url("/login");
                    });
                console.log(promise)
                // }
                // else
                // {
                //     console.log("they exist");
                //     model.errorMessage = "User already exists.";
                // }
            }
            else
            {
                model.errorMessage = "Passwords do not match.";
            }
        }

        function init()
        {
            console.log("registerController init");
        }
        init();
    };



})();





