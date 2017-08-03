/* indexController *
 */


(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("ajController", ajController)



    function ajController($location, userService){
        var model = this;

        function init(){
            alert("HI from ajController");

        }
        init();

    };

})();





