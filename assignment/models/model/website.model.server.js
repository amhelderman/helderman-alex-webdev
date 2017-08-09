var mongoose = require("mongoose");
var db = require("../database");

var websiteSchema = require("../schema/website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

var pageModel = require("./page.model.server");

module.exports = websiteModel;
websiteModel.createWebsite = createWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findWebsiteByUser = findWebsiteByUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.removeUserWebsites = removeUserWebsites;


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
function removeUserWebsites(userId){
    return findWebsiteByUser(userId).then(function(websites){
        console.log("Remove user websites!!!!!");
        console.log(websites);
        for(var w in websites){
            deleteWebsite(websites[w]._id);
        }
    })
}
function deleteWebsite(websiteId){
    return websiteModel.findById(websiteId).remove()
        .then(function (status){
            console.log("Deleting website worked?");
            console.log(status);
            pageModel.removeUserWebsites(websiteId); // don't return page status because there can be multiple pages deleted - no need for this yet.
        })
}
