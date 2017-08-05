var app = require("../../express");
var userModel = require("../models/user.model.server");

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

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
            console.log("created user:");
            console.log(user);
            res.json(user);
        })
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;

    console.log("updating user ");
    console.log(user);

    userModel.updateUser(userId, user)
        .then(function(status){
            console.log("udpated user status:");
            console.log(status);
            res.json(status);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}

function findUserByUsernameAndPassword(req, res){
    var username = req.query.username;
    var password = req.query.password;
    console.log("finding the user "+username+" with password "+password);

    if(username && password){

        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
    }
    else{
        res.sendStatus(0);
    }
}

function findUserById(req, res) {
    console.log("find UserByID "+req.params.userId);
    userModel.findUserById(req.params.userId)
        .then(function(user){
            res.json(user);
        })
}

function deleteUser(req, res){
    console.log("Deleting user "+ req.params.userId);
    userModel.deleteUser(req.params.userId);
}
