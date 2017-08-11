var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, { collection: 'userinfo' });

module.exports = userSchema;