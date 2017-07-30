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
        .controller("websiteListController", websiteListController);

    function websiteListController($location, $routeParams,userService, websiteService){
        var model = this;

        model.userId = $routeParams.userId;

        function init()
        {
            console.log("websiteListController init.");

            var promise = websiteService.findWebsitesByUser(model.userId);
            promise.then(function(response){
                console.log("finding websites - received response");
                console.log(response);

                model.websites = response.data;
                if(!model.websites.length)
                {
                    model.errorMessage="Please create a website.";
                }
            });
        }
        init();
    };



})();





