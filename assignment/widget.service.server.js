// based on code from jannunzi

var app = require("../express");

app.post    ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", createWidget);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", findAllWidgetsForPage);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.put     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete  ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);

// app.post("/api/upload", function(req,res){res.sendStatus(200);});
app.put     ("/page/:pageId/widget/", sortWidgets);





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


function sortWidgets(req, res){
    // console.log("YES");
    var pageId = req.params.pageId;
    // console.log(req);
    var startIndex = req.query.initial;
    var endIndex = req.query.final;
    console.log("Sorting widgets!");
    console.log([pageId, startIndex, endIndex]);

    if((startIndex < 0 || startIndex > widgets.length)
        ||(endIndex < 0 || endIndex > widgets.length)){
        res.sendStatus(400);
        return;
    }

    var tempWidget = widgets[endIndex];
    widgets[endIndex] = widgets[startIndex];
    widgets[startIndex] = tempWidget;
    console.log("after:");
    console.log(widgets);
    res.sendStatus(200);

}


function createWidget(req, res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var widget = req.body;

    console.log("Checking if widget already exists");
    var index = widgets.indexOf(widget);
    if (index > -1) {
        res.sendStatus(204); // No Content - must indicate somehow that it exists
    }
    else
    {
        widget._id =(new Date()).getTime() + "";
        widget.pageId = pageId;

        console.log("Creating widget ");
        console.log(widget);
        widgets.push(widget);
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
        if(widgets[u]._id === widgetId) {
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

function findAllWidgetsForPage(req, res)
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
    for (var p in widgets){
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


function getWidgetByIdInternal(widgetId)
{

    console.log("Finding widget with Id "+widgetId);
    for (var p in widgets){
        var currentWidget = widgets[p];
        if(currentWidget._id === widgetId)
        {
            console.log("found widget "+currentWidget.name);
            return currentWidget;
        }
    }
    return null;
}



 // module.exports = function (app) {

     var multer = require('multer'); // npm install multer --save

     var upload = multer({ dest: __dirname+'/public/uploads' });

     console.log(multer);
console.log("upload:");
console.log(upload);
console.log("single:");
console.log(upload.single('myFile'));
app.post ("/api/upload", upload.single('myFile'), uploadImage);
// app.post ("/api/upload",  uploadImage);


     function uploadImage(req, res) {
         console.log("uploading image!");
         console.log(req.body);
         console.log("---------------------");
         var widgetId      = req.body.widgetId;
         var width         = req.body.width;
         var myFile        = req.file;
         var userId = req.body.userId;
         var websiteId = req.body.websiteId;
         var webId = req.body.webId;
         var pageId = req.body.pageId;
         var originalname  = myFile.originalname; // file name on user's computer
         var filename      = myFile.filename;     // new file name in upload folder
         var path          = myFile.path;         // full path of uploaded file
         var destination   = myFile.destination;  // folder where file is saved to
         var size          = myFile.size;
         var mimetype      = myFile.mimetype;

         console.log(myFile);
         widget = getWidgetByIdInternal(widgetId);
         console.log(widget);
         widget.url = '/uploads/'+filename;

         // #!/widget/{{model.userId}}/{{model.webId}}/{{model.pageId}}/list
         var callbackUrl   = "/assignment/#!/widget/"+userId
                                +"/"+websiteId
                                +"/"+pageId
                                +"/list";
         res.redirect(callbackUrl);
     }



 // }
