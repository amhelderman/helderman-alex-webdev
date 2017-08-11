var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

module.exports = widgetModel;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetByPageId = findWidgetByPageId;

function updateWidget(widgetId, widget){
    return widgetModel.update({_id: widgetId}, {$set: widget});
}
function createWidget(widget){
    return widgetModel.create(widget);
}
function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}
function findWidgetByPageId(pageId){
    return websiteModel.find({pageId: pageId});
}