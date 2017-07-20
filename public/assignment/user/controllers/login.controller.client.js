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




            // When logging in...
        model.login = function(user){
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if(user == null)
            {
                model.errorMessage = "user not found";
            }
            else {
                $location.url("profile/"+user._id);
            }
        }
    };

})();





