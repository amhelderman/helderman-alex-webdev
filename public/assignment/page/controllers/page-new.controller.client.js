/**
 * Created by Alex on 7/19/17.
 */



/* Handle Angular Application */

(function (){

    /* Get previously-declared Angular module */
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($location, $routeParams,userService, pageService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;


        model.createPage = function(){
            console.log("Create page");
            console.log(model.page);
            if(!model.page)
            {
                console.log("no page");
                model.errorMessage = "Please define the new page or press back to cancel."
            }
            else
            {
                pageService.createPage(model.webId, model.page);
                $location.url("/page/"+model.userId+"/"+model.webId+"/list");

            }
        };


        function init()
        {
            console.log("pageNewController init.");


        }
        init();


    };



})();





