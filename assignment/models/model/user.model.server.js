var mongoose = require("mongoose");
var db = require("../database");

var userSchema = require("../schema/user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

var websiteModel = require("./website.model.server");

module.exports = userModel;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser=deleteUser;


function updateUser(userId, user){
    return userModel.update({_id: userId}, {$set: user});
}
function createUser(user){
    return userModel.create(user);
}
function findUserById(userId){
    return userModel.findById(userId);
}
function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function deleteUser(userId){
    return userModel.findById(userId).remove()
        .then(function (status){
            console.log("Deleting user worked?");
            console.log(status);
            websiteModel.removeUserWebsites(userId);
        })
}