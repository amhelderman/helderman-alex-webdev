var app = require("../express");

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

function createUser(req, res){
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}


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

function findUserById(req, res) {
    console.log("server: get UserByID "+req.params.userId);
    for(var u in users) {
        if(users[u]._id === req.params.userId) {
            res.send(users[u]);
        }
    }
    res.send(404);
}

function deleteUser(req, res){

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
