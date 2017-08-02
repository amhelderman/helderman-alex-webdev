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
        .controller("widgetListController", widgetListController);

    function widgetListController($location, $sce, $routeParams, widgetService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.trustUrlResource = function(url){
            console.log(url);
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];

            return $sce.trustAsResourceUrl(youtubeUrl);
            // return $sce.trustAsResource
        }

        model.trustHtmlContent = function(htmlContent){
            return $sce.trustAsHtml(htmlContent);
        }
        model.setTrusted = function(url){
            console.log("setting trusted url:");
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
        function init()
        {
            console.log("widgetListController init.");
            console.log("Making widget list sortable!");

            console.log("done with that");

            var promise = widgetService.findWidgetsByPageId(model.userId,
                model.webId,
                model.pageId);
            promise.then(function(response){

                model.widgets = response.data;

                if(!model.widgets.length)
                {
                    model.errorMessage="Please create a widget.";
                }

                initWidgetList();
            });
        }
        function initWidgetList(){


            $(function() {
                console.log("Running jquery within angular controller!");
                for(var w in model.widgets) {
                    var widget = model.widgets[w];

                    var li = $("<li>");
                    $("#widgetList").append(li);

                    var widgetDiv=$("<div>");
                    li.append(widgetDiv);

                    if(widget.widgetType=='HEADING'){
                        widgetDiv.append("<h1>"+widget.text+"</h1>");
                    } else if (widget.widgetType=='IMAGE'){

                        var img = $("<img>");
                        img.attr("src", widget.url);
                        widgetDiv.append(img);

                    }if (widget.widgetType=='YOUTUBE'){
                        var iframe = $("<iframe>");
                        iframe.attr("width", widget.width);
                        iframe.attr("height", 400);
                        iframe.attr("src", model.trustUrlResource(widget.url));
                        widgetDiv.append(iframe);

                    }
                }

                $("ul").sortable();

            });

        }
        init();
    };



})();





