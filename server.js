var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assignment'));

require("./test/app");
require("./assignment/app");

// from piazza thread 641
port = process.env.PORT || 3000;
app.listen(port);

