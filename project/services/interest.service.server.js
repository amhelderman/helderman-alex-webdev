var app = require("../../express");

app.post("/ratemyfriend/api/interest/", submitInterest);
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
