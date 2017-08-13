var mongoose = require("mongoose");

var profileSchema = mongoose.Schema({
    lat: Number,
    lng: Number,
    userId: {type: mongoose.Schema.ObjectId, ref:"UserInfoModel"}
}, { collection: 'profileInfo'});

module.exports = profileSchema;