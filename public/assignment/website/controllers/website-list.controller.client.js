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

        var userId = $routeParams.userId;

        function init()
        {
            console.log("websiteListController init.");

            model.websites = websiteService.findWebsitesForUser(userId)
        }
        init();
    };



})();





