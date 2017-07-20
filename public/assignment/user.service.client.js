/**
 * Created by Alex on 7/19/17.
 */




(function(){
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService()
    {

        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]


        return {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser
        };

        function updateUser(userId, user)
        {
            var currentUser = findUserById(userId);

            currentUser = user;
            return user;
        }



        function findUserById(id)
        {
            for( var u in users){
                var currentUser = users[u];
                if(currentUser._id === id) {
                    return currentUser;
                }
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password)
        {
            for( var u in users){
                var currentUser = users[u];
                if(currentUser.username === username
                    & currentUser.password === password) {
                    return currentUser;
                }
            }
            return null;
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
            var existingUser = userService.findUserByUsername(user.username);
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

    }
})();