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

    function pageListController($location, $routeParams,userService, websiteService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        model.pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        model.getWebsiteByID = getWebsiteByID;



        function init()
        {
            console.log("pageListController init.");
            model.user = userService.findUserById(model.userId);
            model.website = getWebsiteByID(model.webId);
            // model.pages = pageService.findPagesForWebsite(model.webId);
        }
        init();


        function getWebsiteByID(pageId)
        {
            console.log("Finding website with Id "+pageId);
            for (p in model.pages){
                var currentPage = model.pages[p];
                if(currentPage._id === pageId)
                {
                    console.log("found website "+currentPage.name);
                    return currentPage;
                }
            }
            return null;
        }


    };



})();





