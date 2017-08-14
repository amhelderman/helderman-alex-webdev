var mongoose = require("mongoose");

var profileSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    lat: Number,
    lng: Number,
    userId: {type: mongoose.Schema.ObjectId, ref:"UserInfoModel"}
}, { collection: 'profileInfo'});

module.exports = profileSchema;