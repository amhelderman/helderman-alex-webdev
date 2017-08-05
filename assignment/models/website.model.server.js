var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

module.exports = websiteModel;
websiteModel.createwebsite = createwebsite;
websiteModel.updatewebsite = updatewebsite;
websiteModel.findwebsiteById = findwebsiteById;
websiteModel.deleteWebsite = deleteWebsite;


function updatewebsite(websiteId, website){
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function createwebsite(website){
    return websiteModel.create(website);
}
function findwebsiteById(websiteId){
    return websiteModel.findById(websiteId);
}
function deleteWebsite(websiteId){
    return websiteModel.remove(websiteId);
}