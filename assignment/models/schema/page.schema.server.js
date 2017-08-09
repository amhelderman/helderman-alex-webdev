var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    name: String,
    websiteId:  {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    description: String,
    dateCreated: {type: Date, default: Date.now()}
});

module.exports = pageSchema;