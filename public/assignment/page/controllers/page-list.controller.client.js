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
        .controller("pageListController", pageListController);

    function pageListController($location, $routeParams, pageService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        model.createPage = pageService.createPage;
        model.findPagesByWebsiteId = pageService.findPagesByWebsiteId;
        model.findPageById = pageService.findPageById;
        model.updatePage = pageService.updatePage;
        model.deletePage = pageService.deletePage;
        function init()
        {
            console.log("pageListController init.");
            console.log(model.webId);
            var promise = pageService.findPagesByWebsiteId(model.userId, model.webId);
            promise.then(function(response){
                console.log("finding pages - received response!");
                console.log(response);
                model.pages = response.data;

                if(!model.pages.length)
                {
                    model.errorMessage="Please create a page.";
                }
                console.log(model.pages);

            });
        }
        init();


    };



})();





