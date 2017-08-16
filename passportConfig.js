var app = require('./express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

console.log("Passport configuration running.");
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());