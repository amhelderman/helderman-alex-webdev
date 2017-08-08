var mongoose = require("mongoose");

var widgetSchema = mongoose.Schema({
    widgetType: {type: String, enum: ["HTML", "HEADER", "LABEL", "TEXT",
        "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
    name      : String,
    title     : String,
    text      : {type:String, default:'Text'},
    size      : Number,
    url       : String,
    pageId    : {type: mongoose.Schema.ObjectId, ref: "PageModel"},
    indexInList : Number
});

// TODO: Sort widgets using the indexInList field, which is set every time the list is sorted.
//https://stackoverflow.com/questions/32167714/specific-order-by-field-in-ng-repeat

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