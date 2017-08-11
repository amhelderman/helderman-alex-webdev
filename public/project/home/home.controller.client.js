/**
 * Created by Alex on 7/26/17.
 */


(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("homeController", homeController)



    function homeController($location){
        var model = this;


        function init(){
            console.log("hello from homeController");
        }
        init();
    };

})();





