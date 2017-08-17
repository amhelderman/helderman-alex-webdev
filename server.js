var app = require('./express');
var express = app.express;

var passport = require('passport');
var cookieParser=require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assignment'));
app.use(express.static(__dirname + '/project'));

require("./test/app");
require("./assignment/app");
require("./project/app");
require("./passportConfig");

// allow cross-origin
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);


// from piazza thread 641
port = process.env.PORT || 3000;
app.listen(port);

