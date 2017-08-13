var mongoose = require("mongoose");
var db = require("../database");

var userSchema = require("../schema/user.schema.server");
var userModel = mongoose.model("UserInfoModel", userSchema);


module.exports = userModel;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser=deleteUser;


function updateUser(userId, user){
    console.log("updateUser");
    console.log([userId, user]);
    return userModel.update({_id: userId}, {$set: user});
}
function createUser(user){
    console.log("createUser");
    console.log([user]);
    return userModel.create(user);
}
function findUserById(userId){
    console.log("findUserById");
    console.log(userId);
    console.log(["model here it is:", userModel.findById(userId)]);
    return userModel.findById(userId).then(function (response){
       console.log("or here......");
       console.log(response);
       return response;

    });
}
function findUserByCredentials(username, password) {
    console.log("updateUser");
    console.log([username, password]);
    return userModel.findOne({username: username, password: password});
}

function deleteUser(userId){
    return userModel.findById(userId).remove()
        .then(function (status){
            console.log("Deleting user worked?");
            console.log(status);
            // websiteModel.removeUserWebsites(userId);
        })
}