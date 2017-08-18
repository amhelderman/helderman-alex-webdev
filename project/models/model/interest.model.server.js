var mongoose = require("mongoose");
var db = require("../database");

var interestSchema = require("../schema/interest.schema.server");
var interestModel = mongoose.model("interestInfoModel", interestSchema);


module.exports = interestModel;
// CRUD
interestModel.getInterestByLabel = getInterestByLabel;
interestModel.createInterest = createInterest;
interestModel.findInterestById=findInterestById;
interestModel.findInterestsByUser = findInterestsByUser;
interestModel.updateInterest = updateInterest;
interestModel.deleteInterest=deleteInterest;


function getInterestByLabel(label){
    return interestModel.findOne({label: label});
}

function createInterest(interest){
    console.log("interest model, creating interest", interest.label)

    if(!interest.profileIDs){
        throw error("HEY, this interest has no profile");
    }

    return interestModel.create(interest);
}
function findInterestById(interestId){
    return interestModel.findOne({_id: interestId});
}
function findInterestsByUser(userId){
    return interestModel.find({userId: userId});
}
function updateInterest(interestId, interest){
    return interestModel.update({_id: interestId}, {$set: interest});
}
function deleteInterest(interestId){
    return interestModel.findById(interestId).remove();
}