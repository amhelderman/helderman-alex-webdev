var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    name: String,
    developerId: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    description: String,
    dateCreated: {type: Date, default: Date.now()}
});

module.exports = websiteSchema;