var mongoose = require("mongoose");


var HtmlSchema = mongoose.Schema({
    text: String
});
var YouTubeSchema = mongoose.Schema({
    text: String
});
var DataTableSchema = mongoose.Schema({
    text: String
});
var RepeaterSchema = mongoose.Schema({
    text: String
});
var TextInputSchema = mongoose.Schema({
    text: String
});

var widgetSchema = mongoose.Schema({
    widgetType: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT",
        "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
    name      : String,
    title     : String,
    text      : {type:String, default:'Text'},
    size: Number,
    html      : HtmlSchema,
    youTube   : YouTubeSchema,
    datatable : DataTableSchema,
    repeater  : RepeaterSchema,
    textInput : TextInputSchema
});



/*[
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
 */
module.exports = widgetSchema;