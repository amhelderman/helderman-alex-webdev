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

            var promise = widgetService.findWidgetsByPageId(model.userId,
                model.webId,
                model.pageId);
            promise.then(function(response){

                model.widgets = response.data;

                if(!model.widgets.length)
                {
                    model.errorMessage="Please create a widget.";
                }

            });
        }
        init();
    };



})();





