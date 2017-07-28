// based on code from jannunzi

var app = require("../express");

app.post    ("/api/user/:userId/website/:websiteId/page", createPage);
app.get     ("/api/user/:userId/website/:websiteId/page", findPagesByWebsiteId);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.put     ("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete  ("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

var pages =
    [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "321", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "890", "description": "Lorem" },
        { "_id": "321", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "890", "description": "Lorem" }
    ];

function createPage(websiteId, page)
{
    page._id =(new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    $http.sendStatus(201); // Created
}


function findPagesByWebsiteId(websiteId)
{
    console.log("Finding pages with websiteId "+websiteId);
    var out = [];
    for (var p in pages){
        var currentPage = pages[p];
        if(currentPage.websiteId === websiteId)
        {
            out.push(currentPage);
        }
    }
    console.log("found "+out.length+" pages.");
    $http.send( out);
}


function findPageById(pageId)
{
    console.log("Finding page with Id "+pageId);
    for (var p in pages){
        var currentPage = pages[p];
        if(currentPage._id === pageId)
        {
            console.log("found page "+currentPage.name);
            $http.send( currentPage);
            return;
        }
    }
    $http.sendStatus(404);
}

function updatePage(pageId, page)
{
    var oldPage = findPageById(pageId);
    oldPage = page;
    $http.sendStatus(200); // Updated
}

function deletePage(pageId)
{
    /* Remove the user */
    var index = pages.indexOf(findPageById(pageId));
    if (index > -1) {
        pages.splice(index, 1);
        $http.sendStatus(200);
    }
    else{
        $http.sendStatus(404);
    }
}

