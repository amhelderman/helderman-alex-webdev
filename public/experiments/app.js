/**
 * Created by Alex on 8/3/17.
 */



(function (){

    angular
        .module("ajApp", ["ngRoute"])
        .controller("ajController", ajController)


    function ajController($location){
        var model = this;
        model.message="HI";

    }


})();


