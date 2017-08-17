(function(){
    angular
        .module("WamApp")
        .service("profileService", profileService);

    function profileService($window, $http)
    {
        this.createProfile = createProfile;
        this.getProfile = getProfile;
        this.getProfileByUser = getProfileByUser;
        this.updateProfile = updateProfile;
        this.deleteProfile = deleteProfile;
        this.getLocations = getLocations;

        function getLocations(mapPosition){
            console.log(["profileService - getLocations", mapPosition]);
            var url = "/ratemyfriend/api/profile/location/";
            return $http.post(url, mapPosition);
        }


        function createProfile(profile){
            console.log("profile service: createProfile profile "+profile._id);
            var url = "/ratemyfriend/api/profile/";
            return $http.post(url, profile);
        }

        function getProfile(profileId){
            console.log("Project - Profile Service Client - getProfile "+profileId);
            var url = "/ratemyfriend/api/profile/"+profileId;
            return $http.get(url).then(function(response){
                // console.log("GET profile IN SERVICE: response");
                // console.log(response);
                return response;
            })
        }

        function getProfileByUser(userId){
            console.log("Profile Service Client - getProfileByUser "+userId);
            var url = "/ratemyfriend/api/user/"+userId+"/profile";
            return $http.get(url).then(function(response){
                // console.log("GET profile IN SERVICE: response");
                // console.log(response);
                return response;
            })
        }

        function updateProfile(profileId, profile){
            console.log("Project - Profile Service Client - updateProfile "+profileId);
            var url = "/ratemyfriend/api/profile/"+profileId;
            return $http.put(url, profile);
        }

        function deleteProfile(profileId){
            console.log("Project - Profile Service Client - deleteProfile "+profileId);
            var url = "/ratemyfriend/api/profile/"+profileId;
            return $http.delete(url);
        }


    }
})();