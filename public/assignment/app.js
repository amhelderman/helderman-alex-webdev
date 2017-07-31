/**
 * Created by Alex on 7/17/17.
 */

(function (){

    angular
        .module("WamApp", ["ngRoute"]);

    // JQuery execution
    $(init);

    function init(){
        alert("hello from jquery");
        $("widgetList").append("HELLOimage");
        // $("div").draggable();
    };

})();





