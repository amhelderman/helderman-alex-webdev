/**
 * Created by Alex on 7/31/17.
 */

(function (){

    angular
        .module("wbdvDirectives", [])
        .controller("wbdvController", wbdvController)
        .directive("wbdvSortable", wbdvSortable)


    function wbdvSortable($http, $routeParams){

        function linkFunction(scope, element){

            var startIndex = -1;
            var endIndex = -1;
            element.find("ul")
                .sortable({
                    start: function (event, ui){
                        startIndex = $(ui.item).index();
                    },
                    stop: function(event, ui){
                        endIndex = $(ui.item).index();
                        var pageId = $routeParams.pageId;
                        var url = "/page/"+pageId
                            +"/widget?initial="+startIndex
                            +"&final="+endIndex;
                        console.log(url);
                        $http.put(url);

                    }
                });

        }

        return {
            // template : "{{widgets}}!"
            templateUrl: "directives/widget-list.html",
            link: linkFunction
        };
    }


    function wbdvController($scope){

        $scope.message = "Hello from controller";
        // $scope.widgets =[
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];

    }





})();