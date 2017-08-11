/**
 * Created by Alex on 7/19/17.
 */
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

        var users= [
            {_id: 1, username: "alice", password: "alice"},
            {_id: 2, username: "po", password: "po"}
        ];

        function createUser(user){
            console.log("Project - User Service Client - createUser ");
            users.push(user);
        }

        function getUser(userId){
            console.log("Project - User Service Client - getUser ");
            for(var u in users){
                if (users[u]._id === userId){
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user){
            console.log("Project - User Service Client - updateUser ");
            for(var u in users){
                if (users[u]._id === userId){
                    users[u] = user;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId){
            console.log("Project - User Service Client - deleteUser ");
            for(var u in users){
                if (users[u]._id === userId){
                    var index = users.indexOf(users[u]);
                    if (index > -1) {
                        array.splice(index, 1);
                        return true;
                    }
                }
            }
            return null;
        }


    }
})();