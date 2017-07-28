/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService()
    {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website)
        {
            website.developerId = userId;
            website._id = (new Date()).getTime() + "";
            websites.push(website);
            console.log("Created website, here is websites:"+websites);
            console.log("Created website, here is website:"+website.name);
        }

        function findWebsitesByUser(userId){
            var sites = [];

            for(var w in websites){
                if(websites[w].developerId === userId)
                {
                    sites.push( websites[w]);
                }
            }
            return sites;
        }


        function findWebsiteById(userId, webId){
            var url =  "/api/user/"+userId+"/website/"+webId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website)
        {
            var oldWebsite = findWebsiteById(websiteId);
            oldWebsite = website;
            return website;
        }

        function deleteWebsite(websiteId)
        {
            var websiteToRemove = findWebsiteById(websiteId);
            /* Remove the user */
            var index = websites.indexOf(websiteToRemove);
            console.log("found website of index "+index+"to delete.");
            if (index > -1) {
                websites.splice(index, 1);
            }
        }



    }
})();