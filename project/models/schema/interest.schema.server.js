var mongoose = require("mongoose");

var interestSchema = mongoose.Schema({
    label: String,
    userId: {type: mongoose.Schema.ObjectId, ref:"UserInfoModel"}
}, { collection: 'interestInfo'});

module.exports = interestSchema;