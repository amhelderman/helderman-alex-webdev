var mongoose = require("mongoose");
var db = require("../database");

var interestSchema = require("../schema/interest.schema.server");
var interestModel = mongoose.model("interestInfoModel", interestSchema);


module.exports = interestModel;
// CRUD
interestModel.createInterest = createInterest;
interestModel.findInterestById=findInterestById;
interestModel.findInterestByUser = findInterestByUser;
interestModel.updateInterest = updateInterest;
interestModel.deleteInterest=deleteInterest;

function createInterest(interest){
    return interestModel.create(interest);
}
function findInterestById(interestId){
    return interestModel.findOne({_id: interestId});
}
function findInterestByUser(userId){
    return interestModel.find({userId: userId});
}
function updateInterest(interestId, interest){
    return interestModel.update({_id: interestId}, {$set: interest});
}
function deleteInterest(interestId){
    return interestModel.findById(interestId).remove();
}