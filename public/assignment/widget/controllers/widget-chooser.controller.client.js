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

        function init()
        {
            console.log("widgetChooserController init.");
        }
        init();


        model.getIncludedWidget = function(){
            var widgetPath = "/widget/"+model.userId+"/"
                +model.webId+"/"
                +model.pageId+"/"
                +model.widgetId+"/heading-edit";
            console.log(widgetPath);
            return "home.html";
        }


        // not used yet...
        model.createWidget = function(){
            return widgetService.createWidget(model.pageId, model.widget);
        }

        /* Create widgets */

        model.createHeadingWidget = function(){
            console.log("controller: create heading widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "Heading!";
            model.widget.widgetType = "HEADING";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createLabelWidget = function(){
            console.log("controller: create Label widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "label.";
            model.widget.widgetType = "LABEL";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createTextWidget = function(){
            console.log("controller: create Text widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "plain text.";
            model.widget.widgetType = "TEXT";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createLinkWidget = function(){
            console.log("controller: create Text widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "link.";
            model.widget.url = "/page/"+model.userId+"/"+model.webId+"/list";
            model.widget.widgetType = "TEXT";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createButtonWidget = function(){
            console.log("controller: create Button widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "Button!";
            model.widget.url = "/page/"+model.userId+"/"+model.webId+"/list";
            model.widget.widgetType = "BUTTON";
            widgetService.createWidget(model.pageId, model.widget);
            $location.url("/widget/"+model.userId+"/"+model.webId+"/"+model.pageId+"/list");
        }
        model.createHtmlWidget = function(){
            console.log("controller: create Html widget");
            model.widget = {};
            model.widget.size = 1;
            model.widget.text = "<h1>heading1<h1> and <h2>heading2</h2>!";
            model.widget.widgetType = "HTML";
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




    };



})();





