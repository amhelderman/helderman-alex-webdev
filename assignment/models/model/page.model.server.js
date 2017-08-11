var mongoose = require("mongoose");
var db = require("../database");

var pageSchema = require("../schema/page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);

var widgetModel = require("./widget.model.server");

module.exports = pageModel;
pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.findPageById = findPageById;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.deletePage = deletePage;
pageModel.removeWebsitePages = removeWebsitePages;



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
    return pageModel.find({websiteId: websiteId});
}
function removeWebsitePages(websiteId){
    return findPagesByWebsiteId(websiteId).then(function(pages){
        console.log("Remove website's pages!!!!!");
        console.log(pages);
        for(var w in pages){
            deletePage(pages[w]._id);
        }
    })
}
function deletePage(pageId){
    return pageModel.findById(pageId).remove()
        .then(function (status){
            console.log("Deleting page worked?");
            console.log(status);
            widgetModel.removePageWidgets(pageId);
        })
}