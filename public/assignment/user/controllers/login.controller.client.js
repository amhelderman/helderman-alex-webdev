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
            console.log("in login controller");
            var promise = userService.findUserByUsernameAndPassword(user.username, user.password);
            promise.then(function(response){
                var userResult = response.data;
                console.log(userResult);
                if(!userResult){
                    model.errorMessage = "user not found";
                }
                else {
                    $location.url("profile/"+userResult._id);
                }
            });
        }
    };

})();





