(function(){
    angular
        .module("WamApp")
        .service("interestService", interestService);

    function interestService($http)
    {
        this.submitInterest = submitInterest;
        this.removeInterest = removeInterest;
        this.getInterestsByUser = getInterestsByUser;

        function submitInterest(interest){
            console.log(["interest service client submitInterest", interest]);
            return $http.post("/ratemyfriend/api/interest/", interest);
        }
        function getInterestsByUser(userId){
            console.log(["interest service client getInterestByUser", userId]);
            return $http.get("/ratemyfriend/api/interest/", userId);
        }
        function removeInterest(interest){
            console.log(["interest service client removeInterest", interest]);
            return $http.delete("/ratemyfriend/api/interest/", interest);
        }
    }
})();