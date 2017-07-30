/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http)
    {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function createWidget(pageId, widget)
        {
            // widget.pageId = pageId;
            // widget._id =(new Date()).getTime() + "";
            // widgets.push(widget);
            // console.log("added widget to widgets, now including:");
            // console.log(widgets);
        }


        function updateWidget(widgetId, widget)
        {
            // var oldWidget = findWidgetById(widgetId);
            // oldWidget = widget;
            // console.log("updated widget to widgets, now including:");
            // console.log(widgets);
            // return oldWidget;
        }

        function deleteWidget(widgetId)
        {
            // var widgetRemoved = findWidgetById(widgetId);
            // /* Remove the user */
            // var index = widgets.indexOf(widgetRemoved);
            // if (index > -1) {
            //     widgets.splice(index, 1);
            // }
            // console.log("removed widget from widgets, now including:");
            // console.log(widgets);
        }

////////////////

        function findWidgetsByPageId(pageId)
        {
            // console.log("Finding widgets with page Id "+pageId);
            // var out = [];
            // for (var w in widgets){
            //     var currentWidget = widgets[w];
            //     if(currentWidget.pageId === pageId)
            //     {
            //         out.push(currentWidget);
            //     }
            // }
            // console.log("found "+out.length+" pages.");
            // console.log(out);
            // return out;
        }

        function findWidgetById(widgetId)
        {
            // console.log("Finding widget with widgetId "+widgetId);
            // var out = [];
            // for (var w in widgets){
            //     var currentWidget = widgets[w];
            //     if(currentWidget._id === widgetId)
            //     {
            //         console.log("found widget "+currentWidget.widgetType);
            //         return currentWidget;
            //     }
            // }
            // return null;
        }




    }
})();