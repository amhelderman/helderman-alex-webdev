/**
 * Created by Alex on 7/31/17.
 */

(function (){

    angular
        .module("wbdvDirectives", [])
        .directive("hello", helloDirective)
        .directive("wbdvsortable", wbdvSortable);

    function wbdvSortable(){
        /*

         $( function() {
         $( "#sortable" ).sortable();
         $( "#sortable" ).disableSelection();
         } );

         */
        return {
            template : "<div class='sortable'>YESSSS</div>"
        };
    };

    function helloDirective(){
        return{
            template : "<div><h1> HI there!</h1></div>"
        }
    }





})();