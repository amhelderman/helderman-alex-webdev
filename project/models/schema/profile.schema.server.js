var mongoose = require("mongoose");

var profileSchema = mongoose.Schema({
    firstName: {type: String, default: "John"},
    lastName: {type: String, default: "Smith"},
    birthday: {type: Date, default: Date.now()},
    lat: {type: Number, default: 0},
    lng: {type: Number, default: 0},
    reliable: {type: Number, default: 0},
    cool: {type: Number, default: 0},
    fun: {type: Number, default: 0},
    hot: {type: Number, default: 0},
    bio: {type: String, default: ""},
    userId: {type: mongoose.Schema.ObjectId, ref:"UserInfoModel"}
}, { collection: 'profileInfo'});

module.exports = profileSchema;