var mongoose = require("mongoose");
var db = require("../database");

var interestSchema = require("../schema/interest.schema.server");
var interestModel = mongoose.model("interestInfoModel", interestSchema);


module.exports = interestModel;
interestModel.createInterest = createInterest;
interestModel.updateInterest = updateInterest;
interestModel.findInterestById=findInterestById;
interestModel.findInterestByUser = findInterestByUser;
interestModel.deleteInterest=deleteInterest;

function createInterest(interest){
    return interestModel.create(interest);
}
function findInterestById(interestId){
    return interestModel.find({_id: interestId});
}
function findInterestByUser(userId){
    return interestModel.find({userId: userId});
}
function updateInterest(interestId, interest){
    console.log("updateinterest - interestId, then interest", interestId, interest);
    return interestModel.update({_id: interestId}, {$set: interest});
}
function deleteInterest(interestId){
    return interestModel.findById(interestId).remove()
        .then(function (status){
            return status;
        })
}