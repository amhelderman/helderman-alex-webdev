var app = require("../../express");
var interestModel = require("../models/model/interest.model.server");

// Auto-generation
app.put("/ratemyfriend/api/interest/", generateInterests);

// getting interest by label
app.get("/ratemyfriend/api/interestDetail/:label", getInterestByLabel);

// CRUD
app.post("/ratemyfriend/api/interest/", createInterest);
app.get("/ratemyfriend/api/interest/:interestId", findInterestById);
app.get("/ratemyfriend/api/interestByUser/:userId", getInterestsByUser);
app.put("/ratemyfriend/api/interest/:interestId", updateInterest);
app.delete("/ratemyfriend/api/interest/:interestId", deleteInterest);

function createInterest(req, res){
    interestModel.createInterest(req.body)
        .then(function(status){
            res.status(status);
        });
}
function findInterestById(req, res){
    interestModel.findInterestById(req.params.interestId)
        .then(function(status){
            res.status(status);
        });
}
function getInterestsByUser(req, res){
    var userId = req.params.userId;
    console.log(["SERVER getInterestByUserId", userId]);
    res.status([{name: "swimming"}, {name: "running"}]);
}
function updateInterest(req, res){
    interestModel.updateInterest(req.body, req.params.interestId)
        .then(function(status){
            res.status(status);
        });
}
function deleteInterest(req, res){
    console.log(["SERVER deleteInterest", req.params.interest]);
    interestModel.deleteInterest(req.params.interest)
        .then(function(status){
            res.status(status);
        });
}

/******************************************************/
// Get interest by label
function getInterestByLabel(req, res){
    var label = req.params.label;
    console.log(["server finding interest by label", label])
    interestModel.getInterestByLabel(label)
        .then(function (interest){
            console.log(["server found interest by label", label, interest])
            if(interest){
                res.send(interest);
            }
            else{
                res.send('0');
            }
        })
        .catch(function (err){
            res.status(0);
        })
}
/******************************************************/
// Auto-generation from user's bio.

function generateInterests(req, res){

    var https = require('https');
    var myRes = res;

    var interest = req.body;
    console.log("server - generateInterests "
        +interest.label+" from user "+interest.userId);

    // Make sure the environment is set up.
    if(!(process.env.PRIMAL_APP_ID && process.env.PRIMAL_APP_KEY)){
        throw error("PRIMAL_APP_ID or PRIMAL_APP_KEY undefined.");
    }

    // HTTPS will require options and callback parameters.
    // I use these to specify the API call.
    var options = {
        auth: process.env.PRIMAL_USERNAME+':'+process.env.PRIMAL_PASSWORD,
        host: 'api.primal.com',
        headers: {'Primal-App-ID': process.env.PRIMAL_APP_ID,
            'Primal-App-Key': process.env.PRIMAL_APP_KEY},
        path: '/v2/recommendations?q='+encodeURIComponent(interest.label)+'&maxContentItems=5',
        method: 'GET'
    };
    function callback (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));

        var bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            myRes.send(body);
        })
    }
    var primalReq = https.get(options, callback);

    primalReq.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        myRes.status(404);
    });
}

