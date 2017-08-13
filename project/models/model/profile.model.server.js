var mongoose = require("mongoose");
var db = require("../database");

var profileSchema = require("../schema/profile.schema.server");
var profileModel = mongoose.model("profileInfoModel", profileSchema);


module.exports = profileModel;
profileModel.createProfile = createProfile;
profileModel.updateProfile = updateProfile;
profileModel.findProfileById = findProfileById;
profileModel.findProfileByUser = findProfileByUser;
profileModel.deleteProfile=deleteProfile;
profileModel.deleteProfileByUser=deleteProfileByUser;


function createProfile(profile){
    console.log("createProfile");
    console.log([profile]);
    return profileModel.create(profile);
}
function findProfileById(profileId){
    console.log("findProfileById");
    console.log(profileId);
    return profileModel.findById(profileId).then(function (response){
       return response;

    });
}
function findProfileByUser(userId){
    console.log(["findProfileByUser", userId]);
    return profileModel.findOne({userId: userId});
}
function updateProfile(profileId, profile){
    console.log(["updateProfile", profileId, profile]);
    return profileModel.update({_id: profileId}, {$set: profile});
}
function deleteProfile(profileId){
    return profileModel.findById(profileId).remove()
        .then(function (status){
            return status;
        })
}
function deleteProfileByUser(userId){
    console.log(["deleteProfileByUser", userId]);
    return profileModel.findProfileByUser(userId).remove();
}