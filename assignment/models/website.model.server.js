var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

module.exports = websiteModel;
websiteModel.createWebsite = createWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findWebsiteByUser = findWebsiteByUser;
websiteModel.deleteWebsite = deleteWebsite;


function updateWebsite(websiteId, website){
    return websiteModel.update({_id: websiteId}, {$set: website});
}
function createWebsite(website){
    return websiteModel.create(website);
}
function findWebsiteById(websiteId){
    return websiteModel.findById(websiteId);
}
function findWebsiteByUser(userId){
    return websiteModel.find({developerId: userId});
}
function deleteWebsite(websiteId){
    return websiteModel.findById(websiteId).remove();
}