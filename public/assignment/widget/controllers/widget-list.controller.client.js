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
            console.log("TRUST URL");
            console.log(url);
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];

            return $sce.trustAsResourceUrl(youtubeUrl);
            // return $sce.trustAsResource
        }

        model.trustHtmlContent = function(htmlContent){
            console.log("TRUST CONTENT");
            console.log(htmlContent);
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
                console.log("GOT WIDGETS:");
                console.log(response.data);
                model.widgets = response.data;

                if(!model.widgets.length)
                {
                    model.errorMessage="Please create a widget.";
                }

                // initWidgetList();
            });
        }
        function initWidgetList(){
            $(function() {
                console.log("Running jquery within angular controller!");
                for(var w in model.widgets) {
                    var widget = model.widgets[w];

                    var li = $("<div>");
                    li.attr("class", "ui-sortable");

                    var widgetDiv=$("<div>");
                    // widgetDiv.attr("style", "border: solid;");

                    var widgetLink = $("<a>");
                    widgetLink.attr("href",
                        "#!/widget/"
                        +model.userId+"/"
                        +model.webId+"/"
                        +model.pageId+"/"
                        +widget._id+"/"
                        +"edit");
                    var widgetCog = $("<span>").attr("class", "glyphicon glyphicon-cog pull-right");


                    if(widget.widgetType==='TEXT') {
                        var widgetValue = widget.text;

                    } else if(widget.widgetType==='HEADING'){
                        var widgetValue = "<h1>"+widget.text+"</h1>";

                    } else if (widget.widgetType==='IMAGE'){
                        var img = $("<img>").attr("src", widget.url);
                        var widgetValue =img;

                    } else if (widget.widgetType==='YOUTUBE'){
                        var iframe = $("<iframe>")
                            .attr("width", widget.width)
                            .attr("height", 400)
                            .attr("src", model.trustUrlResource(widget.url));
                        var widgetValue = iframe;
                    }
                    else{
                        widgetValue = $("<div>").append(".");
                    }

                    // chain of appends
                    $("#widgetList").append(li);
                    li.append(widgetDiv);
                    widgetDiv.append(widgetLink);
                    widgetLink.append(widgetCog);
                    widgetDiv.append(widgetValue);
                }

                $("ul").sortable();

            });
        }
        init();
    };



})();





