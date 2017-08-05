var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("UserModel", userSchema);

module.exports = userModel;
userModel.createUser = createUser;
userModel.findUserById = findUserById;



function createUser(user){
    return userModel.create(user);
}
function findUserById(userId){
    return userModel.findById(userId);
}
function findUserByUsernameAndPassword(username, password){
    return userModel.findById(userId);
}