(function(){
    angular
        .module("WamApp")
        .service("interestService", interestService);

    function interestService($http, profileService)
    {
        // Auto generate interests
        this.generateInterests = generateInterests;
        this.getInterestByLabel = getInterestByLabel;

        // Individual interests can still be CRUD edited.
        this.createInterest = createInterest;
        this.getInterestById = getInterestById;
        this.getInterestsByUser = getInterestsByUser;
        this.updateInterest = updateInterest;
        this.removeInterest = removeInterest;


        // Auto Generate
        function generateInterests(bio){
            console.log(["interest service client generateInterests", bio]);
            return $http.put("/ratemyfriend/api/interest/", bio).then(function(response){
                console.log(response.data);
                var data = response.data;
                if(data){
                    var inputInterests = data["@graph"].splice(0,5);

                    for(var i in inputInterests) {

                        profileService.getProfileByUser(bio.userId)
                            .then(function (profile){

                                var completedInterest = inputInterests[i];
                                completedInterest.profileIDs.push(bio.userId);

                                if(completedInterest){
                                    createInterest(completedInterest);
                                }
                            })
                    }
                    return inputInterests;
                }

            })
        }


        // Get interest by label
        function getInterestByLabel(label){
            return $http.get("/ratemyfriend/api/interestDetail/"+label);
        }



        // CRUD
        function createInterest(interest){
            console.log(["interest service client createInterest", interest]);
            return $http.post("/ratemyfriend/api/interest/", interest);
        }
        function getInterestById(interestId){
            console.log(["interest service client getInterestById", interest]);
            return $http.get("/ratemyfriend/api/interest/"+interestId);
        }
        function getInterestsByUser(userId){
            console.log(["interest service client getInterestsByUser", userId]);
            return $http.get("/ratemyfriend/api/interestByUser/"+userId);
        }
        function updateInterest(interestId, interest){
            console.log(["interest service client updateInterest", interest]);
            return $http.put("/ratemyfriend/api/interest/"+interestId, interest);
        }
        function removeInterest(interestId){
            console.log(["interest service client removeInterest", interestId]);
            return $http.delete("/ratemyfriend/api/interest/"+ interestId);
        }

    }
})();