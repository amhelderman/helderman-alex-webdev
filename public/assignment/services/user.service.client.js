/**
 * Created by Alex on 7/19/17.
 */


(function(){
    angular
        .module("WamApp")
        .service("userService", userService);

    function userService($http)
    {

        var users=[
            {_id: "123", username: "alice",    email: "alice@wonderland.com",       password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      email: "bob@wonderland.com",         password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   email: "charly@wonderland.com",      password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", email: "jannunzi@wonderland.com",    password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];


        this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;
        this.findUserById = findUserById;
        this.registerUser = registerUser;
        this.unregisterUser = unregisterUser;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;


        function registerUser(user)
        {
            /* Handle user check at client level */

            var existingUser = findUserByUsername(user.username);
            if(existingUser)
            {
                return null;
            }
            else {
                var url = "/api/user/"+userId;
                $http.post(url, user)
                    .then(function(response){
                        return response.data;
                    })
            }
        }


        function unregisterUser(userId)
        {
            console.log("user service: deleting user "+userId);
            var url = "/api/user/"+userId;
            $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }


        function updateUser(userId, user)
        {
            var url = "/api/user/"+userId;
            $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }



        function findUserById(userId)
        {
            console.log("user service: finding user by id "+userId);
            var url = "/api/user/"+userId;
            $http.get(url)
                .then(function(response){
                return response.data;
            });
        }

        function findUserByUsernameAndPassword(username, password)
        {
            console.log("in user service for findUserByUsernameAndPassword");
            var url = "/api/user?username="+username+"&password="+password;
            $http.get(url)
                .then(function(response){
                    return response.data;
                });

        }


        function findUserByUsername(username)
        {
            var url = "/api/user?username="+username+"&password="+password;
            $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

    }
})();