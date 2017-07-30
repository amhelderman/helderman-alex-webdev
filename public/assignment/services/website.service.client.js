/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http)
    {

        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website){
            var url =  "/api/user/"+userId+"/website/";
            $http.post(url, website);
        }

        function findWebsitesByUser(userId){
            var url =  "/api/user/"+userId+"/website/";
            return $http.get(url);
        }

        function findWebsiteById(userId, webId){
            var url =  "/api/user/"+userId+"/website/"+webId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website){
            var url =  "/api/user/"+userId+"/website/"+websiteId;
            $http.put(url, website);
        }

        function deleteWebsite(websiteId){
            var url =  "/api/user/"+userId+"/website/"+websiteId;
            $http.delete(url);
        }

    }
})();