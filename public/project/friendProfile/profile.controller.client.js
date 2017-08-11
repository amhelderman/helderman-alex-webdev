(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($location, userService){
        var model = this;

        function init(){
            console.log("profileController.");

        }
        init();
    }

})();





