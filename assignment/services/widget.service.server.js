// based on code from jannunzi
var app = require("../../express");
var widgetModel = require("../models/model/widget.model.server");

app.post    ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", createWidget);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/", findAllWidgetsForPage);
app.get     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.put     ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete  ("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);

// app.post("/api/upload", function(req,res){res.sendStatus(200);});
app.put     ("/page/:pageId/widget/", sortWidgets);




//
// var widgets =[
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];
//

/// TODO: sortwidgets
function sortWidgets(req, res){
    // console.log("YES");
    var pageId = req.params.pageId;
    // console.log(req);
    var startIndex = req.query.initial;
    var endIndex = req.query.final;
    console.log("Sorting widgets!");

}


function createWidget(req, res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var widget = req.body;

    widgetModel.createWidget(widget)
        .then(function(widget){
            console.log("created widget:");
            console.log(widget);
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })


}


function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var widget = req.body;

    console.log("UPDATING widget!!!!!!!!");
    console.log(widget);
    widgetModel.updateWidget(widgetId, widget)
        .then(function(status){
            console.log("updateed widget status:");
            console.log(status);
            res.json(status);
        }, function(err){
            res.sendStatus(404).send(err);
        });
}

function deleteWidget(req, res)
{
    var widgetId = req.params.widgetId;

    console.log("Deleting widget "+widgetId);
    widgetModel.deleteWidget(req.params.userId)
        .then(function(status){
            res.sendSatus(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

////////////////

function findAllWidgetsForPage(req, res)
{
    var pageId = req.params.pageId;
    console.log("Finding widgets with websiteId "+pageId);

    widgetModel.findWidgetByPageId(pageId)
        .then(function(widget){
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}

function findWidgetById(req, res)
{
    var widgetId = req.params.widgetId;

    console.log("Findinwg widget with Id "+widgetId);
    widgetModel.findWidgetById(req.params.userId)
        .then(function(widget){
            res.json(widget);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}


function getWidgetByIdInternal(widgetId)
{
    console.log("Finding widget with Id "+widgetId);

    widgetModel.findWidgetById(widgetId)
        .then(function(widget){
            return widget;
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        })
}



 // module.exports = function (app) {

     var multer = require('multer'); // npm install multer --save

     var upload = multer({ dest: __dirname+'/public/uploads' });

    //  console.log(multer);
    // console.log("upload:");
    // console.log(upload);
    // console.log("single:");
    // console.log(upload.single('myFile'));
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
