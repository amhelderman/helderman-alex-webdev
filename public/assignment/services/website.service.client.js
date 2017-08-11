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
            console.log("web service: posting website using url:");
            console.log(url);
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId){
            var url =  "/api/user/"+userId+"/website/";
            console.log("web service: finding websites using url:");
            console.log(url);
            return $http.get(url);
        }

        function findWebsiteById(userId, webId){
            console.log("web service: findWebsite by Id");
            console.log("userId "+userId);
            console.log("webId " + webId);
            var url =  "/api/user/"+userId+"/website/"+webId;
            return $http.get(url);
        }

        function updateWebsite(userId, websiteId, website){
            var url =  "/api/user/"+userId+"/website/"+websiteId;
            console.log("web service: updating website using url:");
            console.log(url);
            return $http.put(url, website);
        }

        function deleteWebsite(userId, websiteId){
            var url =  "/api/user/"+userId+"/website/"+websiteId;
            console.log("web service: deleting website using url:");
            console.log(url);
            return $http.delete(url);
        }

    }
})();