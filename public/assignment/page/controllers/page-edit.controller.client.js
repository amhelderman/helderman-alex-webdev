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

        model.findPageByWebsite = function(){
            console.log("Create page");
            pageService.findPageByWebsite(model.userId, model.webId);
            $location.url("/page/"+model.userId+"/"+model.webId+"/list");
        };

        model.findPageById = function(){
            console.log("Create page");
            pageService.findPageById(model.userId, model.webId, model.pageId);
            $location.url("/page/"+model.userId+"/"+model.webId+"/list");
        };

        model.createPage = function(){
            console.log("Create page");
            pageService.createPage(model.userId, model.webId, model.page);
            $location.url("/page/"+model.userId+"/"+model.webId+"/list");
        };

        model.updatePage = function(){
            console.log("update page");
            pageService.updatePage(model.userId, model.webId, model.pageId, model.page);
            $location.url("/page/"+model.userId+"/"+model.webId+"/list");
        };
        model.deletePage = function(){
            console.log("delete page");
            pageService.deletePage(model.userId, model.webId, model.pageId);
            $location.url("/page/"+model.userId+"/"+model.webId+"/list");
        };


        function init()
        {
            console.log("pageEditController init.");
            var promise= pageService.findPageById(model.userId, model.webId, model.pageId);
            promise.then(function(response){
                console.log("finding pages - received response!");
                console.log(response);
                model.page = response.data;

                if(!model.page)
                {
                    model.errorMessage="No page found.";
                }
                console.log(model.page);

            });
        }
        init();


    };



})();





