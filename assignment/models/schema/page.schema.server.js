var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    name: String,
    websiteId: String,
    description: String
});
/*[
 [
 { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
 { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
 { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
 { "_id": "321", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
 { "_id": "432", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
 { "_id": "543", "name": "Post 3", "websiteId": "890", "description": "Lorem" },
 { "_id": "321", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
 { "_id": "432", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
 { "_id": "543", "name": "Post 3", "websiteId": "890", "description": "Lorem" }
 ];
 */
module.exports = pageSchema;