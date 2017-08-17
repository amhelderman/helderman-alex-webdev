(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($window, $http)
    {
        this.createUser = createUser;
        this.getUser = getUser;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.login = login;
        this.getUserLocations = getUserLocations;
        this.checkLogin = checkLogin;

        function checkLogin(){
            return $http.get('/ratemyfriend/api/loggedin');
        }

        function getUserLocations(){
            // var out = [];
            // for(var u in users){
            //     out.push(users[u].profile.location);
            // }
            // return out;
        }

        function login(user){
            // console.log("user service client login...");
            // console.log(user);

            var myURL = "/ratemyfriend/api/login";

            return $http.post(myURL, user);
        }

        function createUser(user){
            /* Handle user check at client level */
            // console.log("user service: createUser user "+user.username);
            var url = "/ratemyfriend/api/user/";
            return $http.post(url, user);
        }

        function getUser(userId){
            // console.log("Project - User Service Client - getUser "+userId);
            var url = "/ratemyfriend/api/user/"+userId;
            return $http.get(url).then(function(response){
                console.log(["GET USER IN SERVICE: response", response]);
                return response;
            })
        }

        function updateUser(userId, user){
            // console.log("Project - User Service Client - updateUser "+userId);
            var url = "/ratemyfriend/api/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId){
            // console.log("Project - User Service Client - deleteUser "+userId);
            var url = "/ratemyfriend/api/user/"+userId;
            return $http.delete(url);
        }


    }
})();