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
widgetModel.sortWidget = sortWidget;

// Usual API
function createWidget(widget){
    return nextIndex().then(function(value){
        widget.sortIndex = value;
        return widgetModel.create(widget);
    });
}
function updateWidget(widgetId, widget){
    return widgetModel.update({_id: widgetId}, {$set: widget});
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
    console.log("widget "+widgetId+"is being deleted.");
    return widgetModel.findById(widgetId).remove();
}





// Widget sorting and ordering

// Swaps the sortIndices of the two widgets with these indices.
function sortWidget(startIndexMinusOne, endIndexMinusOne){
    var startIndex = Number(startIndexMinusOne) + 1;
    var endIndex = Number(endIndexMinusOne) + 1;
    console.log("Actually widget moved from "+startIndex+" to "+endIndex);
    // we just have to swap IDs.
    return widgetModel.findOne({sortIndex: startIndex})
        .then(function (firstWidget){
            console.log("The first widget with index:"+startIndex);
            console.log(firstWidget);
            return widgetModel.findOne({sortIndex: endIndex})
                .then(function (secondWidget){
                    console.log("The secondWidget with index:"+endIndex);
                    console.log(secondWidget);
                    firstWidget.sortIndex = endIndex;
                    secondWidget.sortIndex = startIndex;
                    return firstWidget.save().then(function(){
                        return secondWidget.save();
                    })

                })

        })
}

// Store a unique sortIndex in database (so server restarts don't cause
// new widgets to appear at the top of the widget page instead of the bottom
// (it would just be strange behavior - I'd rather have unique IDs).
var widgetIndexModel = mongoose.model("widgetIndexModel",
    mongoose.Schema({
        value : {type:Number, default:0},
    })
);
function nextIndex(){
    console.log("Getting next widget index...");
    return widgetIndexModel.findOne()
        .then(function (index){
            console.log("The currently listed index is:");
            if(index === null){
                console.log("Index value was null!");
                widgetIndexModel.create({value: 0});
                return 0;
            }
            else{
                console.log(index.value);
                index.value = index.value + 1;
                index.save();
                return index.value;
            }
        })
        .catch(function (err){
            console.log(err);
        });
}
