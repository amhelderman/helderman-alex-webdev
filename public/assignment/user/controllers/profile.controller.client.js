/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService){
        var model = this;
        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init()
        {
            console.log("finding profile for user "+userId);
            var promise = userService.findUserById(userId);
            promise.then(function (response){
                console.log("profileController got user!");
                console.log(response.data);
                model.user = response.data;
            });
        }
        init();

        function updateUser()
        {
            console.log("update user"+model.user.username);
            $location.url("/login");
        }
        function unregister(){
            console.log(" unreg user"+model.user.username);
            $location.url("/login");
        }
    };



})();





