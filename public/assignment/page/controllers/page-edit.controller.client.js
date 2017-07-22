/**
 * Created by Alex on 7/19/17.
 */


/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, pageService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.createPage = pageService.createPage;
        model.findPageByWebsite = pageService.findPageByWebsite;
        model.findPageById = pageService.findPageById;
        model.updatePage = pageService.updatePage;
        model.deletePage = pageService.deletePage;

        function init()
        {
            console.log("pageEditController init.");
            model.page = pageService.findPageById(model.pageId);
        }
        init();


    };



})();





