var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    name: String,
    developerId: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    description: String
});

module.exports = websiteSchema;