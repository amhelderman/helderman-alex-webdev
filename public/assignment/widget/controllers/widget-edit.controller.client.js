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

        function init()
        {
            console.log("widgetEditController init.");

            model.widget = widgetService.findWidgetById(model.widgetId);
            console.log(model.widget);
        }
        init();
    };



})();





