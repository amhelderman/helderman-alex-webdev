/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)



    function loginController($location, userService){
        var model = this;

        model.hello = "hello from loginController";
        model.login = login;




            // When logging in...
        function login(user){
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if(!user)
            {
                model.errorMessage = "user not found";
                return;
            }
            else {
                $location.url("profile/"+user._id);
            }
        }
    };

})();





