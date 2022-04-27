const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// define routes
app.use('/', require('./routes/pages'));

port_number = 3002;
app.listen(port_number, function () {
    console.log(`server started at ${port_number}`);
});
