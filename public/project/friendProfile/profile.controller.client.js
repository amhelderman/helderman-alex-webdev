(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($location){
        var model = this;

        function init(){
            alert("profileController.");

        }
        init();
    }

})();





