var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("UserModel", userSchema);

module.exports = userModel;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;


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