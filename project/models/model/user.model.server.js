var mongoose = require("mongoose");
var db = require("../database");

var userSchema = require("../schema/user.schema.server");
var userModel = mongoose.model("UserInfoModel", userSchema);
var profileModel = require("./profile.model.server");


module.exports = userModel;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser=deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;


function findUserByGoogleId(gID){
    return userModel.findOne({googleId: gID});
}

function updateUser(userId, user){
    console.log("updateUser");
    console.log([userId, user]);
    return userModel.update({_id: userId}, {$set: user});
}
function createUser(user){
    console.log(["createUser", user]);
    return userModel.create(user).then(
        function(response){
            console.log(["the users id is ", response]);
            console.log(["lets create a profile too..."]);
            var blankProfile = {userId: response._id};
            profileModel.createProfile(blankProfile);
            return response;
        });
}
function findUserById(userId){
    return userModel.findById(userId);
}
function findUserByCredentials(username, password) {
    console.log(["finding user by credentials", username, password]);
    return userModel.findOne({username: username, password: password});
}

function deleteUser(userId){
    return userModel.findById(userId).remove()
        .then(function (status){
            profileModel.deleteProfileByUser(userId);
            return status;
        })
}