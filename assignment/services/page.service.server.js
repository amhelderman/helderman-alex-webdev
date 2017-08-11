// based on code from jannunzi

var app = require("../../express");

app.post    ("/api/user/:userId/website/:websiteId/page/", createPage);
app.get     ("/api/user/:userId/website/:websiteId/page/", findAllPagesForWebsite);
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

function createPage(req, res)
{
    var websiteId = req.params.websiteId;
    var page = req.body;

    console.log("Checking if page already exists");
    var index = pages.indexOf(page);
    if (index > -1) {
        res.sendStatus(204); // No Content - must indicate somehow that it exists
    }
    else
    {
        page._id =(new Date()).getTime() + "";
        page.websiteId = websiteId;

        console.log("Creating page ");
        console.log(page);
        pages.push(page);
        res.json(page);
    }

}


function findAllPagesForWebsite(req, res)
{
    var websiteId = req.params.websiteId;

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
    res.send( out);
}


function findPageById(req,res)
{
    var pageId = req.params.pageId;

    console.log("Finding page with Id "+pageId);
    for (var p in pages){
        var currentPage = pages[p];
        if(currentPage._id === pageId)
        {
            console.log("found page "+currentPage.name);
            res.json( currentPage);
            return;
        }
    }
    console.log("Did not find it.");
    res.sendStatus(404);
}

function updatePage(req, res)
{
    var pageId = req.params.pageId;
    var page = req.body;

    console.log("UPDATING page!!!!!!!!");
    // console.log("updating page ");
    console.log(page);

    for(var u in pages) {
        console.log("ID CHECK: "+pages[u]._id+" === "+pageId);
        if(pages[u]._id === pageId) {
            console.log("Yes it does.");

            console.log("Does page [u] ");
            console.log(pages[u]);

            pages[u] = page;

            console.log("equal this page?");
            console.log(page);
            res.json(page);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res)
{
    var pageId = req.params.pageId;

    console.log("Deleting page "+pageId);
    for(var w in pages) {
        if(pages[w]._id === pageId) {

            /* Remove the user */
            var index = pages.indexOf(pages[w]);
            if (index > -1) {
                pages.splice(index, 1);
                console.log("deleted.");
                res.sendStatus(200);
                return;
            }
        }
    }
    console.log("NOT deleted.");
    res.sendStatus(404);
}

