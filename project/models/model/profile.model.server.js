var mongoose = require("mongoose");
var db = require("../database");

var profileSchema = require("../schema/profile.schema.server");
var profileModel = mongoose.model("profileInfoModel", profileSchema);


module.exports = profileModel;
profileModel.createProfile = createProfile;
profileModel.updateProfile = updateProfile;
profileModel.findProfileById = findProfileById;
profileModel.findProfilesByUser = findProfilesByUser;
profileModel.deleteProfile=deleteProfile;


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
function findProfilesByUser(userId){
    console.log("findProfilesByUser");
    console.log(userId);
    return profileModel.findById(profileId).then(function (response){
        return response;
    });
}
function updateProfile(profileId, profile){
    console.log("updateProfile");
    console.log([profileId, profile]);
    return profileModel.update({_id: profileId}, {$set: profile});
}
function deleteProfile(profileId){
    return profileModel.findById(profileId).remove()
        .then(function (status){
            return status;
        })
}