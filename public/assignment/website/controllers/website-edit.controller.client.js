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
            var promise = websiteService.createWebsite(model.userId, model.website);
            promise.then(function(response){
                console.log("received response");
                console.log(response);

                // console.log("Navigating to #!/website/"+model.userId+"/list")
                $location.url("/website/"+model.userId+"/list");

            });
        };

        model.updateWebsite = function(){
            console.log("Updating website");
            var promise = websiteService.updateWebsite(model.userId, model.webId, model.website);
            promise.then(function(response){
                console.log("received response");
                console.log(response);

                $location.url("/website/"+model.userId+"/list");
            });
        };

        model.deleteWebsite = function(){
            console.log("Deleting website");
            var promise = websiteService.deleteWebsite(model.userId, model.webId);
            promise.then(function(response){
                console.log("received response");
                console.log(response);

                $location.url("/website/"+model.userId+"/list");
            });

        };


        function init()
        {
            console.log("websiteEditController init.");
            console.log(model);

            var promise1 = websiteService.findWebsiteById(model.userId, model.webId);
            promise1.then(function(response){
                console.log("finding website - received response1");
                console.log(response);
                model.website = response.data;
                if(!model.website)
                {
                    model.errorMessage+="Website not found. ";
                }
            });
            var promise2 = websiteService.findWebsitesByUser(model.userId);
            promise2.then(function(response){
                console.log("finding websites - received response2");
                console.log(response);
                model.websites = response.data;
                if(!model.websites.length)
                {
                    model.errorMessage+="List of websites not found. ";
                }
            });
            console.log("end website Edit controller init");

        }
        init();
    };



})();





