// based on code from jannunzi

var app = require("../../express");
var pageModel = require("../models/model/page.model.server");

app.post    ("/api/user/:userId/website/:websiteId/page/", createPage);
app.get     ("/api/user/:userId/website/:websiteId/page/", findAllPagesForWebsite);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.put     ("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete  ("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);



function createPage(req, res)
{
    var websiteId = req.params.websiteId;
    var page = req.body;
    // page.websiteId = websiteId;
    console.log("creating page!")

    pageModel.createPage(page)
        .then(function(page){
            console.log("created page:");
            console.log(page);
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}


function findAllPagesForWebsite(req, res)
{
    var websiteId = req.params.websiteId;

    console.log("Finding pages with websiteId "+websiteId);

    pageModel.findPageByWebsiteId(websiteId)
        .then(function(page){
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}


function findPageById(req,res)
{
    var pageId = req.params.pageId;

    console.log("Finding page with Id "+pageId);

    pageModel.findPageById(pageId)
        .then(function(page){
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })



}

function updatePage(req, res)
{
    var pageId = req.params.pageId;
    var page = req.body;

    console.log("UPDATING page!!!!!!!!");
    // console.log("updating page ");
    console.log(page);

    pageModel.updatePage(pageId, page)
        .then(function(status){
            res.sendStatus(200);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function deletePage(req, res)
{
    var pageId = req.params.pageId;

    console.log("Deleting page "+pageId);

    pageModel.deletePage(pageId)
        .then(function(status){
            res.sendStatus(200);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

