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

function findUserByUsernameAndPassword(req, res){
    console.log(req.query);

    var username = req.query.username;
    var password = req.query.password;

    for( var u in users){
        var currentUser = users[u];
        if(currentUser.username === username
            & currentUser.password === password) {
            res.send( currentUser);
            return;
        }
    }
    res.send(404);
}


/* User stuff */
function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    console.log("server: get UserByID "+req.params.userId);
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
    response.send(404);
}