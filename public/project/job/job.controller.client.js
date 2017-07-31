/**
 * Created by Alex on 7/26/17.
 */


(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("jobController", jobController)



    function jobController($location){
        var model = this;


        function init(){
            console.log("hello from jobController");
        }
        init();
    };

})();





