/**
 * Created by Alex on 7/19/17.
 */
(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($http)
    {

        this.login = login;
        this.logout = logout;
        this.findUserById = findUserById;
        this.registerUser = registerUser;
        this.unregisterUser = unregisterUser;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;


        /* Set */
        function registerUser(user)
        {
            /* Handle user check at client level */
            console.log("user service: registering user "+user.username);
            var url = "/api/user/";
            return $http.post(url, user);
        }


        /* Set */
        function unregisterUser(userId)
        {
            console.log("user service: deleting user "+userId);
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }


        /* Set */
        function updateUser(userId, user)
        {
            console.log("user service: updating user "+userId);
            var url = "/api/user/"+userId;
            return $http.put(url, user);
        }



        /* Set */
        function findUserById(userId)
        {
            console.log("user service: finding user by id "+userId);
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function login(username, password)
        {
            console.log("in user service for login");
            var url = '/api/login';
            return $http.post(url, {username: username,
                                    password: password});
        }
        function logout(){
            console.log("user service client logout");
            var url =  '/api/logout';
            return $http.post(url);
        }


        function findUserByUsername(username)
        {
            console.log("user service: finding user "+username);
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

    }
})();