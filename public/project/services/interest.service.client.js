(function(){
    angular
        .module("WamApp")
        .service("interestService", interestService);

    function interestService($http)
    {
        // Auto generate interests
        this.generateInterests = generateInterests;

        // Individual interests can still be CRUD edited.
        this.createInterest = createInterest;
        this.getInterestById = getInterestById;
        this.getInterestsByUser = getInterestsByUser;
        this.updateInterest = updateInterest;
        this.removeInterest = removeInterest;


        // Auto Generate
        function generateInterests(interest){
            console.log(["interest service client submitInterest", interest]);
            return $http.post("/ratemyfriend/api/interest/", interest);
        }

        // CRUD
        function createInterest(interest){
            console.log(["interest service client removeInterest", interest]);
            return $http.delete("/ratemyfriend/api/interest/", interest);
        }
        function getInterestById(interestId){
            console.log(["interest service client removeInterest", interest]);
            return $http.delete("/ratemyfriend/api/interest/", interest);
        }

        function getInterestsByUser(userId){
            console.log(["interest service client getInterestByUser", userId]);
            return $http.get("/ratemyfriend/api/interest/", userId);
        }
        function updateInterest(){
            console.log(["interest service client removeInterest", interest]);
            return $http.delete("/ratemyfriend/api/interest/", interest);
        }
        function removeInterest(interest){
            console.log(["interest service client removeInterest", interest]);
            return $http.delete("/ratemyfriend/api/interest/", interest);
        }

    }
})();