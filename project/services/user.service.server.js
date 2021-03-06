
/*                      Require
 *
 */
var app = require("../../express");
var userModel = require("../models/model/user.model.server");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var auth = authorized;


/*                      API
 *
 */
app.post  ('/ratemyfriend/api/login', passport.authenticate('local'),  login);
app.get  ('/ratemyfriend/api/logout',         logout);
app.post  ('/ratemyfriend/api/register',       register);
app.post  ('/ratemyfriend/api/user',     auth, createUser);
app.get   ('/ratemyfriend/api/loggedin',       loggedin);
app.get   ('/ratemyfriend/api/isadmin',       isAdmin);
app.get   ('/ratemyfriend/api/user',     auth, findAllUsers);
app.get   ('/ratemyfriend/api/user/:userId', auth, findUserById);
app.put   ('/ratemyfriend/api/user/:userId', auth, updateUser);
app.delete('/ratemyfriend/api/user/:userId', auth, deleteUser);




/*                      Passport Config - Google
 *
 */

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
};

app.get('/auth/google',
    passport.authenticate('google',
        { scope : ['profile', 'email']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://helderman-alex-webdev.herokuapp.com/project/#!/user',
        failureRedirect: 'http://helderman-alex-webdev.herokuapp.com/project/#!/login'
    }));

function gAuthorized (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    console.log("GOOGLE STRATEGY IS RUNNING! HOORAY!");
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
                        googleId: profile.id,
                        googleToken: token
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


/*                      Passport Config - Local
 *
 */
function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

passport.use(new LocalStrategy(localStrategy));
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username,password)
        .then(
            function(user) {
                console.log("Local strategy has determined the user to be:");
                console.log(user);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            });
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
    console.log(["Login Request has been received by the server and authorized", user]);
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {

    if(req.isAuthenticated()) {
        console.log(["Logged In Check: authenticated.", req.user]);
        res.send(req.user);
    } else{
        console.log(["Logged In Check: not authenticated.", req.user]);
        res.send('0');
    }
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


/*                      Security-Related API Definition
 *
 */
function findAllUsers(req, res){
    console.log("user server - findAllusers")
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

/*                      CRUD Operations
 *
 */
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

function findUserById(req, res) {
    userModel.findUserById(req.params.userId)
        .then(function(user){
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
