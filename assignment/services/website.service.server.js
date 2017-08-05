// based on code from jannunzi

var app = require("../../express");
var websiteModel = require("../models/website.model.server");

app.post    ("/api/user/:userId/website", createWebsite);
app.get     ("/api/user/:userId/website", findAllWebsitesForUser);
app.get     ("/api/user/:userId/website/:websiteId", findWebsiteById);
app.put     ("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete  ("/api/user/:userId/website/:websiteId", deleteWebsite);

// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

function createWebsite(req, res) {
    var website = req.body;
    websiteModel.createWebsite(website)
        .then(function(website){
            console.log("created website:");
            console.log(website);
            res.json(website);
        })
}

function updateWebsite(req, res){
    var webId = req.params.websiteId;
    var website = req.body;

    console.log("UPDATING WEBSITE!!!!!!!!");

    websiteModel.updateWebsite(webId, website)
        .then(function(status){
            console.log("updated website status:");
            console.log(status);
            res.json(status);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}

function findWebsiteById(req, res) {
    var webId = req.params.websiteId;
    console.log("Finding website with id "+webId);
    websiteModel.findWebsiteById(webId)
        .then(function(website){
            console.log("found website:");
            console.log(website);
            res.json(website);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    console.log("Finding websites with userId "+userId);
    websiteModel.findWebsiteByUser(userId)
        .then(function(website){
            console.log("found website:");
            console.log(website);
            res.json(website);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}


function deleteWebsite(req, res) {
    var webId = req.params.websiteId;

    console.log("Deleting website "+webId);
    websiteModel.deleteWebsite(webId)
        .then(function(status){
            console.log("deleted website, status:");
            console.log(status);
            res.json(status);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}

