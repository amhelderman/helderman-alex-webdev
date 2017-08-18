var mongoose = require("mongoose");

var interestSchema = mongoose.Schema({
    label: String,
    profileIDs: []
}, { collection: 'interestInfo'});

module.exports = interestSchema;