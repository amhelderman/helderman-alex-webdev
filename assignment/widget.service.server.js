// based on code from jannunzi

var app = require("../express");

app.post    ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", createWidget);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", findWidgetsByPageId);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.put     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete  ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);


var widgets =[
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req, res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var widget = req.body;

    console.log("Checking if widget already exists");
    var index = pages.indexOf(widget);
    if (index > -1) {
        res.sendStatus(204); // No Content - must indicate somehow that it exists
    }
    else
    {
        widget._id =(new Date()).getTime() + "";
        widget.pageId = pageId;

        console.log("Creating widget ");
        console.log(widget);
        pages.push(widget);
        res.json(widget);
    }
}


function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var widget = req.body;

    console.log("UPDATING widget!!!!!!!!");
    console.log(widget);

    for(var u in widgets) {
        console.log("ID CHECK: "+widgets[u]._id+" === "+widgetId);
        if(pages[u]._id === widgetId) {
            console.log("Yes it does.");

            console.log("Does widget [u] ");
            console.log(widgets[u]);

            widgets[u] = widget;

            console.log("equal this widget?");
            console.log(widget);
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res)
{
    var widgetId = req.params.widgetId;

    console.log("Deleting widget "+widgetId);
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {

            /* Remove the user */
            var index = widgets.indexOf(widgets[w]);
            if (index > -1) {
                widgets.splice(index, 1);
                console.log("deleted.");
                res.sendStatus(200);
                return;
            }
        }
    }
    console.log("NOT deleted.");
    res.sendStatus(404);
}

////////////////

function findWidgetsByPageId(req, res)
{
    var pageId = req.params.pageId;

    console.log("Finding widgets with websiteId "+pageId);
    var out = [];
    for (var p in widgets){
        var currentWidget = widgets[p];
        if(currentWidget.pageId === pageId)
        {
            out.push(currentWidget);
        }
    }
    console.log("found "+out.length+" widgets.");
    res.send( out);
}

function findWidgetById(req, res)
{
    var widgetId = req.params.widgetId;

    console.log("Finding widget with Id "+widgetId);
    for (var p in pages){
        var currentWidget = widgets[p];
        if(currentWidget._id === widgetId)
        {
            console.log("found widget "+currentWidget.name);
            res.json( currentWidget);
            return;
        }
    }
    console.log("Did not find it.");
    res.sendStatus(404);
}