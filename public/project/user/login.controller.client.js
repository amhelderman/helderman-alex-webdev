(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location){
        var model = this;

        function init(){
            alert("loginController.");

        }
        init();
    }

})();





