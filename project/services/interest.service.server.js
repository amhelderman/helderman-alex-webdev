var app = require("../../express");

app.post("/ratemyfriend/api/interest/", interestTest);
app.get("/ratemyfriend/api/interest/:userId", getInterestsByUser);
// app.delete("/ratemyfriend/api/interest/:profileId", removeInterest);


console.log("interest service loaded.");

function submitInterest(req, res){
    // var interest = req.body;
    // console.log(["SERVER submitInterest", interest]);
    // res.status(201);
}

function getInterestsByUser(req, res){
    // var userId = req.params.id;
    // console.log(["SERVER getInterestByUserId", userId]);
    // res.status([{name: "swimming"}, {name: "running"}]);
}
function removeInterest(req, res){
    // var interest = req.body;
    // console.log(["SERVER deleteInterest", interest]);
    // res.status(201);
}

// Referenced: https://nodejs.org/api/http.html#http_http_request_options_callback
// https://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
function interestTest(req, res){

    var https = require('https');
    var myRes = res;
    console.log(["here it is", myRes]);

    console.log(["GOT PROCESSS VARIABLES: ",{'Primal-App-ID': process.env.PRIMAL_APP_ID,
        'Primal-App-Key': process.env.PRIMAL_APP_KEY}] );

    var options = {
        auth: process.env.PRIMAL_USERNAME+':'+process.env.PRIMAL_PASSWORD,
        host: 'api.primal.com',
        headers: {'Primal-App-ID': process.env.PRIMAL_APP_ID,
                 'Primal-App-Key': process.env.PRIMAL_APP_KEY},
        path: '/v2/recommendations?q=cars&maxContentItems=5',
        method: 'GET'
    };
    function callback (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        var bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            //
            // console.log(["yeah..........", body]);
            // var labels = body['@graph'];

            myRes.send(body);
        })
    }
    var req = https.get(options, callback);

    req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        myRes.status(404);
    });

}