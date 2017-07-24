/**
 * Created by Alex on 7/19/17.
 */
/**
 * Created by Alex on 7/19/17.
 */
/**
 * Created by Alex on 7/17/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($location, $routeParams, widgetService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;


        model.getIncludedWidget = function(){
            var widgetPath = "/widget/"+model.userId+"/"
                +model.webId+"/"
                +model.pageId+"/"
                +model.widgetId+"/heading-edit";
            console.log(widgetPath);
            return "home.html";
        }

        model.createWidget = function(){
            return widgetService.createWidget(model.pageId, model.widget);
        }
        model.updateWidget = function(){
            console.log("updating widget...");
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url("#!/widget/"+model.userId+"/"+model.webId+"/list");
        }
        model.deleteWidget = function(){
            console.log("deleting widget...");
            widgetService.deleteWidget(model.widgetId);
            $location.url("#!/widget/"+model.userId+"/"+model.webId+"/list");
        }

        function init()
        {
            console.log("widgetEditController init.");


            model.widget = widgetService.findWidgetById(model.widgetId);
            console.log(model.widget);
            console.log(model.widget.widgetType);
        }
        init();


    };



})();





