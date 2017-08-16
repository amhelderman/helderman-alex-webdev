var app = require("../../express");
var userModel = require("../models/model/user.model.server");
var passport      = require('passport');
var auth = authorized;

app.post  ('/ratemyfriend/api/login', passport.authenticate('local'), login);
app.post  ('/ratemyfriend/api/logout',         logout);
app.post  ('/ratemyfriend/api/register',       register);
app.post  ('/ratemyfriend/api/user',     auth, createUser);
app.get   ('/ratemyfriend/api/loggedin',       loggedin);
app.get   ('/ratemyfriend/api/isadmin',       isAdmin);
app.get   ('/ratemyfriend/api/user',     auth, findAllUsers);
app.put   ('/ratemyfriend/api/user/:id', auth, updateUser);
app.delete('/ratemyfriend/api/user/:id', auth, deleteUser);

/********* Passport configuration *************/

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

// Configure Local Strategy
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}


// Serialization / deserialization

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


// Implementation
function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function isAdmin(req, res){
    if(req.isAuthenticated()){
        var user = req.user;

        userModel.findOne({username: user.username, password: user.password})
            .then(function(user){
                if(user !== null){
                    if(user.isAdmin){
                        res.send(user);
                    }
                    else{
                        res.send(503);
                    }
                } else{
                    res.send('0');
                }
            })
    } else{
        res.send(0);
    }
}


/***********************************************/

function findAllUsers(req, res){
    userModel.find().then(function(response){ res.send(response)});
}

function register(req, res){
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
    console.log("111finding the user '"+username+"' with password '"+password+"'...");

    if(username && password){
        console.log("username and password are filled in, so...");
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                console.log(user);
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
    } else{
        console.log("username and password arent defined!");
        res.sendStatus(0);
    }
}

function findUserById(req, res) {
    console.log("find111 UserByID "+req.params.userId);
    userModel.findUserById(req.params.userId)
        .then(function(user){
            console.log("WE FOUND HER");
            console.log(user);
            res.json(user);
        })
}

function deleteUser(req, res){
    console.log("Deleting user "+ req.params.userId);
    userModel.deleteUser(req.params.userId)
        .then(function(status){
            console.log("Did we delete the user?");
            res.sendStatus(status);
        })
}
