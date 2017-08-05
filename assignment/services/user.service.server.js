var app = require("../../express");
var userModel = require("../models/user.model.server");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.post("/api/user", createUser);
app.get("/api/user", findUserByUsernameAndPassword);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


/* Set */
function createUser(req, res){
    var user = req.body;
    console.log("Creating user ");
    console.log(user);
    userModel.createUser(user)
        .then(function(user){
            res.json(user);
        })
}

/* Set */
function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;

    console.log("updating user ");
    console.log(user);

    for(var u in users) {
        if(users[u]._id === userId) {

            // user._id = (new Date()).getTime() + "";
            users[u] = user;

            console.log("Updated user ");
            console.log(user);
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}


/* Set */
function findUserByUsernameAndPassword(req, res){
    console.log(req.query);

    var username = req.query.username;
    var password = req.query.password;
    console.log("finding by passsword the user "+username);

    for( var u in users){
        var currentUser = users[u];
        if(currentUser.username === username
            & currentUser.password === password) {
            console.log("found user "+username);
            res.send( currentUser);
            return;
        }
    }
    console.log("Did not find user "+username);
    res.send(404);
}

/* Set */
function findUserById(req, res) {
    console.log("find UserByID "+req.params.userId);
    userModel.findUserById(req.params.userId)
        .then(function(user){
            res.json(user);
        })
    // for(var u in users) {
    //     if(users[u]._id === req.params.userId) {
    //         console.log("found user");
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // console.log("did not find user");
    // res.send(404);
}

/* Set */
function deleteUser(req, res){

    console.log("Deleting user "+ req.params.userId);

    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            /* Remove the user */
            var index = users.indexOf(users[u]);
            if (index > -1) {
                users.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
    res.sendStatus(404);
}