const express = require("express");
const bodyParser = require('body-parser');
const app = express();
// const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

port_number = 3002;
app.listen(port_number, function () {
    console.log(`server started at ${port_number}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});