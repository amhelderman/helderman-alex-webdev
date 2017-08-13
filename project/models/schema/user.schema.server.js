var mongoose = require("mongoose");
/*
[
            {_id: 1,
             username: "alice",
             password: "alice",
             profile:  {location: {lat: 42.36,
                 lng: -71.09}
                        }
            },
            {_id: 2,
             username: "po",
             password: "po",
             profile:  {location: {lat: 42.34,
                 lng: -71.08}
                        }
            },
        ];
 */

var LatLngSchema = mongoose.Schema({
    lat: Number,
    lng: Number
}, { collection: 'LatLng'});

var profileSchema = mongoose.Schema({
    location: {type: LatLngSchema, default: {lat: 42.34,lng: -71.08}},
    photo: []
}, { collection: 'profileInfo'});

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, { collection: 'userinfo' });

module.exports = userSchema;