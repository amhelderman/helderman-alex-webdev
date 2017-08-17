(function(){
    angular
        .module("WamApp")
        .service("interestService", interestService);

    function interestService($http)
    {
        // Individual interests can still be CRUD edited.
        this.generateInterests = generateInterests;
        this.getInterestsByUser = getInterestsByUser;
        this.updateInterest = updateInterest;
        this.removeInterest = removeInterest;

        function generateInterests(interest){
            console.log(["interest service client submitInterest", interest]);
            return $http.post("/ratemyfriend/api/interest/", interest);
        }
        function getInterestsByUser(userId){
            console.log(["interest service client getInterestByUser", userId]);
            return $http.get("/ratemyfriend/api/interest/", userId);
        }
        function removeInterest(interest){
            // console.log(["interest service client removeInterest", interest]);
            // return $http.delete("/ratemyfriend/api/interest/", interest);
        }

        function updateInterest(){
            // console.log(["interest service client removeInterest", interest]);
            // return $http.delete("/ratemyfriend/api/interest/", interest);
        }
    }
})();