var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    name: String,
    websiteId:  {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    description: String
});

module.exports = pageSchema;