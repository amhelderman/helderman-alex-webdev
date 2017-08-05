var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var pageModel = mongoose.model("PageModel", pageSchema);

module.exports = pageModel;
pageModel.createpage = createpage;
pageModel.updatepage = updatepage;
pageModel.findpageById = findpageById;


function updatePage(pageId, page){
    return pageModel.update({_id: pageId}, {$set: page});
}

function createPage(page){

    return pageModel.create(page);
}
function findPageById(pageId){
    return pageModel.findById(pageId);
}