/**
 * Created by Alex on 7/17/17.
 */

(function (){

    angular
        .module("WamApp", ["ngRoute"]);

    // JQuery execution
    $(init);

    function init(){
        console.log("hello from jquery");
        // $("widgetList").append("HELLOimage");
        // $("widgetList").draggable();
        // $("div").draggable();
        $("img").draggable();
        // $("li").draggable();
        // $("ul").draggable();

        $(".sortableList").sortable({
            revert: true,
            /*update: function (event, ui) {
             // Some code to prevent duplicates
             }*/
        });
        $(".draggable").draggable({
            connectToSortable: '.sortableList',
            cursor: 'pointer',
            helper: 'clone',
            revert: 'invalid'
        });
    }

})();





