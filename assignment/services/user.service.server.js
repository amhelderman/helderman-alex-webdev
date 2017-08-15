var app = require("../../express");
var userModel = require("../models/model/user.model.server");

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];


// User authentication with server
var passport      = require('passport');
var auth = authorized;

// app.post("/api/user", createUser);
// app.get("/api/user", findUserByUsernameAndPassword);
app.get("/api/user/:userId", findUserById);
// app.put("/api/user/:userId", updateUser);
// app.delete("/api/user/:userId", deleteUser);

app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout',         logout);
app.post  ('/api/register',       register);
app.post  ('/api/user',     auth, createUser);
app.get   ('/api/loggedin',       loggedin);
app.get   ('/api/user',     auth, findAllUsers);
app.put   ('/api/user/:id', auth, updateUser);
app.delete('/api/user/:id', auth, deleteUser);


function findUserByCredentials(req, res){
    throw error("findUserByCredentials called???");
    // var username = req.query.username;
    // var password = req.query.password;
    // console.log("finding the user "+username+" with password "+password);
    //
    // if(username && password){
    //
    //     userModel.findUserByCredentials(username, password)
    //         .then(function (user) {
    //             res.json(user);
    //             return;
    //         }, function (err) {
    //             res.sendStatus(404).send(err);
    //             return;
    //         })
    // }
    // else{
    //     res.sendStatus(0);
    // }
}
function login(req, res){

    var user = req.user;
    res.json(user);
}
function logout(req, res){
    req.logOut();
    res.send(200);
}
function register(){
    throw error("RFEGISTER NOT IMPLEMENTED!");
}
function loggedin(){
    res.send(req.isAuthenticated() ? req.user : '0');
}
function findAllUsers(){
    throw error("findAllUsers NOT IMPLEMENTED!");
}

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

// Configure Passport!
// var userModel = require("../../models/user/user.model.server.js")();
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

// Set up Cookies!
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

// set up google oauth
// var passport       = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
// respond to google button click
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// answer the response from the google servers to allow login
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

// Google Passport

passport.use(new GoogleStrategy(googleConfig, googleStrategy));



function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}







// Standard database

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
    var userId = req.params.id;
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


function findUserById(req, res) {
    throw error("THIS ISNT SUPPOSED TO HAPPEN - findUserById");

    console.log("find UserByID "+req.params.userId);
    userModel.findUserById(req.params.userId)
        .then(function(user){
            res.json(user);
        })
}

function deleteUser(req, res){
    console.log("Deleting user "+ req.params.id);
    userModel.deleteUser(req.params.userId)
        .then(function(status){
            res.sendSatus(status);
        })
}

