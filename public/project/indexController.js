/* indexController *
 */


(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("indexController", indexController)



    function indexController($location, userService){
        var model = this;

        model.hello = "hello from indexController";
        model.login = login;


        // When logging in...
        function login(user){
            console.log("in indexController controller");
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





