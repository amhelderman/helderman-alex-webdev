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
        // $(".sortableList").append("HELLO");
        // $("li").draggable();
        // $("ul").sortable();

        // $(".sortableList").sortable({
        //     revert: true,
        //     /*update: function (event, ui) {
        //      // Some code to prevent duplicates
        //      }*/
        // });
        // $(".draggable").draggable({
        //     connectToSortable: '.sortableList',
        //     cursor: 'pointer',
        //     helper: 'clone',
        //     revert: 'invalid'
        // });


        // $("h1").remove();
        // $("div").append("<h2>Hello World</h2>")
        var ul = $("<ul>");

        for(var l = 0; l < 10; l++) {
            // var li = $("<li> Item " + l + "</li>");
            var li = $("<li>");
            li.append("Item " + l);
            ul.append(li);
        }
        $("#widgetList").append(ul);

        $(".sortableUL").sortable();

        $("ul").sortable();
    }

})();





