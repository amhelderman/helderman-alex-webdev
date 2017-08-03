/**
 * Created by Alex on 8/3/17.
 */



(function (){

    angular
        .module("ajApp", ["ngRoute"])
        .controller("ajController", ajController)
        .service("jobService", jobService);


    function jobService($http)
    {
        this.getJobTypes = getJobTypes;
        this.deletePage = deletePage;

        function getJobTypes(){
            var url = "https://authenticjobs.com/api/?api_key=2f9cf88dada5697e6eda2c4e8855ccc7&method=aj.types.getlist";
            console.log("getJobTypes");
            console.log(url);
            return $http.get(url);
        }
        function deletePage(userId, websiteId, pageId){
            var url =  "/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId;
            console.log("page service: deleting page using url:");
            console.log(url);
            return $http.delete(url);
        }

    }

    function ajController($location, jobService){
        var model = this;
        model.message="HI";

        function init(){

            jobService.getJobTypes()
                .then(function(response){
                    console.log(response);
                    model.message = response.data;
                })
        }
        init();
    }


})();


