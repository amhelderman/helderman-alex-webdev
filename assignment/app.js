
/**
 * Created by Alex on 7/26/17.
 */

// based on code from class
var app = require("../express");



var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUserByUsernameAndPassword);

function findUserByUsernameAndPassword(req, ret){
    console.log("HELLO");
    console.log(req.query);
    res.send(req.query);
}


/* User stuff */
function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
}