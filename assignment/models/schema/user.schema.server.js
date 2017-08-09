var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean
});

module.exports = userSchema;