/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http)
    {

        var users=[
            {_id: "123", username: "alice",    email: "alice@wonderland.com",       password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      email: "bob@wonderland.com",         password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   email: "charly@wonderland.com",      password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", email: "jannunzi@wonderland.com",    password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]


        return {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "unregisterUser": unregisterUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser
        };

        function updateUser(userId, user)
        {
            var currentUser = findUserById(userId);
            currentUser = user;
            return user;
        }



        function findUserById(userId)
        {
            console.log("user service: finding user by id "+userId);
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsernameAndPassword(username, password)
        {
            console.log("in user service for findUserByUsernameAndPassword");
            return $http.get("/api/user?username="+username+"&password="+password);

        }


        function findUserByUsername(username)
        {
            for( var u in users){
                var currentUser = users[u];
                if(currentUser.username === username) {
                    return currentUser;
                }
            }
            return null;
        }


        function registerUser(user)
        {
            var existingUser = findUserByUsername(user.username);
            if(existingUser)
            {
                return null;
            }
            else {
                user._id = (new Date()).getTime() + "";
                users.push(user);
                return user;
            }
        }


        function unregisterUser(userId)
        {
            var userToRemove = findUserById(userId);
            /* Remove the user */
            var index = users.indexOf(user);
            if (index > -1) {
                users.splice(index, 1);
            }
        }
    }
})();