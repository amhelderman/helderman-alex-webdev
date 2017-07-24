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
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($location, $routeParams, websiteService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;


        model.createWebsite = function(){
            console.log("Creating website with name "+model.website.name+".");
            websiteService.createWebsite(model.userId, model.website);
            console.log("Navigating to #!/website/"+model.userId+"/list")
            $location.url("/website/"+model.userId+"/list");
        };

        model.updateWebsite = function(){
            console.log("Updating website");
            websiteService.updateWebsite(model.webId, model.website);
            $location.url("/website/"+model.userId+"/list");

        };

        model.deleteWebsite = function(){
            console.log("Deleting website");
            websiteService.deleteWebsite(model.webId);
            $location.url("/website/"+model.userId+"/list");

        };


        function init()
        {
            console.log("websiteEditController init.");
            console.log(model);

            model.website = websiteService.findWebsiteById(model.webId);
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
    };



})();





