var mongoose = require("mongoose");

var profileSchema = mongoose.Schema({
    location: {type: LatLngSchema, default: {lat: 42.34,lng: -71.08}},

}), { collection: 'profileInfo' );


module.exports = profileSchema;