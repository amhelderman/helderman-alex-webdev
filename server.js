// Express, bodyParser.
var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');


// Configuring user login sessions
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Allow converstion of http body into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving up public, assignment, and project files.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assignment'));
app.use(express.static(__dirname + '/project'));

// loading three other node.js scripts.
require("./test/app");
require("./assignment/app");
require("./project/app");

// allow cross-origin CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

// Listen for connections
port = process.env.PORT || 3000;
app.listen(port);

