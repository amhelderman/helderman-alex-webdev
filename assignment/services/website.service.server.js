// based on code from jannunzi

var app = require("../../express");

app.post    ("/api/user/:userId/website", createWebsite);
app.get     ("/api/user/:userId/website", findAllWebsitesForUser);
app.get     ("/api/user/:userId/website/:websiteId", findWebsiteById);
app.put     ("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete  ("/api/user/:userId/website/:websiteId", deleteWebsite);

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
    console.log("Checking if website already exists");
    var index = websites.indexOf(website);
    if (index > -1) {
        res.sendStatus(204); // No Content - must indicate somehow that it exists
    }
    else
    {
        website.developerId = userId;
        website._id = (new Date()).getTime() + "";
        console.log("Creating website ");
        console.log(website);

        websites.push(website);
        res.json(website);
    }
}

function updateWebsite(req, res){
    var webId = req.params.websiteId;
    var website = req.body;

    console.log("UPDATING WEBSITE!!!!!!!!");
    // console.log("updating website ");
    console.log(website);

    for(var u in websites) {
        console.log("ID CHECK: "+websites[u]._id+" === "+webId);
        if(websites[u]._id === webId) {
            console.log("Yes it does.");

            console.log("Does website [u] ");
            console.log(websites[u]);

            websites[u] = website;

            console.log("equal this website?");
            console.log(website);
            res.json(website);
            return;
        }
    }
    res.sendStatus(404);
}

function findWebsiteById(req, res) {
    var webId = req.params.websiteId;
    console.log("Finding website with id "+webId);

    for(var w in websites) {
        if(websites[w]._id === webId) {
            console.log("Found it.");
            res.json(websites[w]);
            return websites[w];
        }
    }
    console.log("Did not find it.");
    res.sendStatus(404);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    console.log("Finding websites with userId "+userId);

    var sites = [];

    for(var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    console.log(sites);
    res.json(sites);
    return sites;
}


function deleteWebsite(req, res) {
    var webId = req.params.websiteId;

    console.log("Deleting website "+webId);
    for(var w in websites) {
        if(websites[w]._id === webId) {

            /* Remove the user */
            var index = websites.indexOf(websites[w]);
            if (index > -1) {
                websites.splice(index, 1);
                console.log("deleted.");
                res.sendStatus(200);
                return;
            }
        }
    }
    console.log("NOT deleted.");
    res.sendStatus(404);

}

