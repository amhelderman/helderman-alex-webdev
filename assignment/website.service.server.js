// based on code from jannunzi

var app = require("../express");

app.get ("/api/user/:userId/website", findWebsitesForUser);
app.get ("/api/user/:userId/website/:websiteId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/user/:userId/website", updateWebsite);
app.delete("/api/user/:userId/website", deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    website.developerId = userId;
    website._id = (new Date()).getTime() + "";

    websites.push(website);
    res.json(website);
}

function findWebsiteById(req, res) {
    for(var w in websites) {
        if(websites[w]._id === req.params.websiteId) {
            res.json(websites[w]);
            return websites[w];
        }
    }
    res.sendStatus(404);
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;

    var sites = [];

    for(var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    res.json(sites);
    return sites;
}


function deleteWebsite(req, res) {
    var websiteId = req.params.webId;

    var websiteToRemove = findWebsiteById(websiteId);

    /* Remove the user */
    var index = websites.indexOf(websiteToRemove);
    console.log("found website of index "+index+"to delete.");
    if (index > -1) {
        websites.splice(index, 1);
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
}

