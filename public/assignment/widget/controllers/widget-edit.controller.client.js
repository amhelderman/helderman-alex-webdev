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

        model.updateWidget = function(){
            console.log("updating widget...");
            widgetService.updateWidget(model.widgetId, model.widget)
            .then(function(response){
                console.log("received response");
                console.log(response);
                $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");

            });
        }

        model.deleteWidget = function(){
            console.log("deleting widget...");
            widgetService.deleteWidget(model.widgetId)
                .then(function(response){
                    console.log("received response");
                    console.log(response);
                    $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");

                });
        }

        function init()
        {
            console.log("widgetEditController init.");


            var promise = widgetService.findWidgetById(model.userId,
                model.webId,
                model.pageId,
                model.widgetId);

            promise.then(function(response){

                model.widget =response.data;

                console.log(model.widget);
                console.log(model.widget.widgetType);
            });
        }
        init();


    };



})();





