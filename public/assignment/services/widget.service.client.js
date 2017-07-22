/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService()
    {


        var widgets =[
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;



        function findWidgetsByPageId(pageId)
        {
            console.log("Finding widgets with page Id "+pageId);
            var out = [];
            for (var w in widgets){
                var currentWidget = widgets[w];
                if(currentWidget.pageId === pageId)
                {
                    out.push(currentWidget);
                }
            }
            console.log("found "+out.length+" pages.");
            return out;
        }




    }
})();