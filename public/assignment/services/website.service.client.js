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

/* createWebsite(userId, website) - adds the website parameter instance to the local websites array. The new website's developerId is set to the userId parameter
 findWebsitesByUser(userId) - retrieves the websites in local websites array whose developerId matches the parameter userId
 findWebsiteById(websiteId) - retrieves the website in local websites array whose _id matches the websiteId parameter
 updateWebsite(websiteId, website) - updates the website in local websites array whose _id matches the websiteId parameter
 deleteWebsite(websiteId) - removes the website from local websites array whose _id matches the websiteId parameter*/

        function createWebsite(userId, website)
        {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId){
            var sites = [];

            for(var w in websites){
                if(websites[w].developerId === userId)
                {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }


        function findWebsiteById(websiteId){
            for(var w in websites){
                if(websites[w]._id === websiteId)
                {
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website)
        {
            var oldWebsite = findWebsiteById(websiteId);
            oldWebsite = website;
            return website;
        }

        function deleteWebsite(websiteId)
        {
            var websiteToRemove = findUserById(websiteId);
            /* Remove the user */
            var index = websites.indexOf(websiteToRemove);
            if (index > -1) {
                websites.splice(index, 1);
            }
        }



    }
})();