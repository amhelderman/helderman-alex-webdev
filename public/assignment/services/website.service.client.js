/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService()
    {

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website){

        }

        function findWebsitesByUser(userId){
        }


        function findWebsiteById(userId, webId){
            var url =  "/api/user/"+userId+"/website/"+webId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website)
        {


            // var oldWebsite = findWebsiteById(websiteId);
            // oldWebsite = website;
            // return website;
        }

        function deleteWebsite(websiteId)
        {
            // var websiteToRemove = findWebsiteById(websiteId);
            // /* Remove the user */
            // var index = websites.indexOf(websiteToRemove);
            // console.log("found website of index "+index+"to delete.");
            // if (index > -1) {
            //     websites.splice(index, 1);
            // }
        }



    }
})();