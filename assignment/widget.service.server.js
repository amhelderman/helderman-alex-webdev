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
    var pageId = req.param.pageId;
    var widget = req.body;

    widget.pageId = pageId;
    widget._id =(new Date()).getTime() + "";
    widgets.push(widget);
    console.log("added widget to widgets, now including:");
    console.log(widgets);
    res.sendStatus(201);
}


function updateWidget(req, res)
{
    var widgetId = req.param.widgetId;
    var widget = req.body;

    var oldWidget = findWidgetById(widgetId);
    oldWidget = widget;
    console.log("updated widget to widgets, now including:");
    console.log(widgets);
    res.sendStatus(200);
}

function deleteWidget(req, res)
{
    var widgetId = req.param.widgetId;

    var widgetRemoved = findWidgetById(widgetId);
    /* Remove the user */
    var index = widgets.indexOf(widgetRemoved);
    if (index > -1) {
        widgets.splice(index, 1);
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
}

////////////////

function findWidgetsByPageId(req, res)
{
    var pageId = req.param.pageId;


    console.log("Finding widgets with page Id "+pageId);
    var out = [];
    for (var w in widgets){
        var currentWidget = widgets[w];
        if(currentWidget.pageId === pageId)
        {
            out.push(currentWidget);
        }
    }
    console.log("found "+out.length+" pages.");
    console.log(out);
    return out;
    return out;
}

function findWidgetById(req, res)
{
    // console.log("Finding widget with widgetId "+widgetId);
    // var out = [];
    // for (var w in widgets){
    //     var currentWidget = widgets[w];
    //     if(currentWidget._id === widgetId)
    //     {
    //         console.log("found widget "+currentWidget.widgetType);
    //         return currentWidget;
    //     }
    // }
    // return null;
}