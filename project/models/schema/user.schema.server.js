var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()},
    googleId: Number
}, { collection: 'userinfo' });

module.exports = userSchema;