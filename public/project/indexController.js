(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("indexController", indexController)

    function indexController($location){
        var model = this;


        function init(){
            console.log("Index controller");

        }
        init();
    }

})();





