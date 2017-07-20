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
            {_id: "123", username: "alice", password: "alice"},
            {_id: "124", username: "jerry", password: "jerry"}
        ];

        return {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername
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