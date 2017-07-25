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
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($location, $routeParams, widgetService){
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


        model.createHeadingWidget = function(){
            console.log("controller: create heading widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "New Widget";
            model.widget.widgetType = "HEADING";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }

        model.createImageWidget = function(){
            console.log("controller: create image widget");
            model.widget = {};
            model.widget.widgetType = "IMAGE";
            model.widget.url = "http://lorempixel.com/400/200/sports/";
            model.widget.width = "100%";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createYoutubeWidget = function(){
            console.log("controller: create youtube widget");
            model.widget = {};
            model.widget.widgetType = "YOUTUBE";
            model.widget.url = "https://www.youtube.com/watch?v=k5dkwQY-_tk";
            model.widget.width = "100%";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }

        model.createWidget = function(){
            return widgetService.createWidget(model.pageId, model.widget);
        }

        function init()
        {
            console.log("widgetChooserController init.");
        }
        init();


    };



})();





