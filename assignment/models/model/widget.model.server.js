var mongoose = require("mongoose");
var db = require("../database");

var widgetSchema = require("../schema/widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

module.exports = widgetModel;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetByPageId = findWidgetByPageId;
widgetModel.deleteWidget = deleteWidget;
widgetModel.removePageWidgets = removePageWidgets;

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
    return widgetModel.find({pageId: pageId});
}
function removePageWidgets(pageId){
    return findWidgetByPageId(pageId).then(function(widgets){
        console.log("Remove page's widgets!!!!!");
        console.log(widgets);
        for(var w in widgets){
            deleteWidget(widgets[w]._id);
        }
    })
}
function deleteWidget(widgetId){
    return widgetModel.findById(widgetId).remove();
}