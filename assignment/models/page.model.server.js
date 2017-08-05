var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var pageModel = mongoose.model("PageModel", pageSchema);

module.exports = pageModel;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.findPageById = findPageById;
pageModel.findPageByWebsiteId = findPageByWebsiteId;


function updatePage(pageId, page){
    return pageModel.update({_id: pageId}, {$set: page});
}

function createPage(page){

    return pageModel.create(page);
}
function findPageById(pageId){
    return pageModel.findById(pageId);
}
function findPageByWebsiteId(websiteId){
    return websiteModel.find({websiteId: websiteId});
}