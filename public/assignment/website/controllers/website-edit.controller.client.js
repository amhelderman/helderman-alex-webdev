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

    function websiteEditController($location, $routeParams,userService, websiteService){
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        function init()
        {
            console.log("websiteEditController init.");
            console.log(model);

            model.websites = websiteService.findWebsitesByUser(model.userId)
        }
        init();
    };



})();





