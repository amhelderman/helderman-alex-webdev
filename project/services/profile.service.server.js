var app = require("../../express");
var profileModel = require("../models/model/profile.model.server");

app.post("/ratemyfriend/api/profile", createProfile);
app.get("/ratemyfriend/api/profile/:profileId", findProfileById);
app.get("/ratemyfriend/api/user/:userId/profile", findProfileByUser);
app.put("/ratemyfriend/api/profile/:profileId", updateProfile);
app.delete("/ratemyfriend/api/profile/:profileId", deleteProfile);

console.log("profile service loaded.");

function createProfile(req, res){
    var profile = req.body;
    console.log(["Creating profile ", profile]);
    profileModel.createProfile(profile)
        .then(function(profile){
            console.log("created profile:");
            console.log(profile);
            res.json(profile);
        })
}


function findProfileById(req, res) {
    console.log("findProfileById "+req.params.profileId);
    profileModel.findProfileById(req.params.profileId)
        .then(function(profile){
            console.log("WE FOUND HER");
            console.log(profile);
            res.json(profile);
        })
}

function findProfileByUser(req, res) {
    var userId = req.params.userId;
    console.log("findProfileByUser "+userId);
    profileModel.findProfileByUser(userId)
        .then(function(profile){
            console.log(["found profile by user", profile]);
            res.json(profile);
        })
}
function updateProfile(req, res){
    var profile = req.body;
    console.log("errrored, lets go");
    console.log(profile);
    var profileId = profileModel.findProfileByUser(profile.userId);

    console.log(["profileService: updateProfile", profileId, profile]);

    profileModel.updateProfile(profileId, profile)
        .then(function(status){
            console.log("udpated profile status:");
            console.log(status);
            res.json(status);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}


function deleteProfile(req, res){
    console.log("Deleting profile "+ req.params.profileId);
    profileModel.deleteProfile(req.params.profileId)
        .then(function(status){
            console.log("Did we delete the profile?");
            res.sendStatus(status);
        })
}
