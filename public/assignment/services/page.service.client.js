/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http)
    {


        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(userId, websiteId, page)
        {
            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/";
            console.log("page service: posting page using url:");
            console.log(url);
            return $http.post(url, page);
        }

        function findPagesByWebsiteId(userId, websiteId){

            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/";
            console.log("page service: finding pages using url:");
            console.log(url);
            return $http.get(url);
        }


        function findPageById(userId, websiteId, pageId){
            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            console.log("page service: findWebsite by Id using url:");
            console.log(url);
            return $http.get(url);
        }

        function updatePage(userId, websiteId, pageId, page){
            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            console.log("page service: updating page using url:");
            console.log(url);
            return $http.put(url, page);
        }

        function deletePage(userId, websiteId, pageId){
            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            console.log("page service: deleting page using url:");
            console.log(url);
            return $http.delete(url);
        }

    }
})();