const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const dotenv = require('dotenv'); 
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose');
var session = require('cookie-session');
//Add sessions
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');

dotenv.config({ path: './.env'}); 

const app = express();

mongoose.connect('mongodb://localhost:27017/bookDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( path.join(__dirname, './public') ));

// parse URL-encoded bodies (as sent by HTML forms)
// make sure you can grab data from any form
app.use(express.urlencoded({ extended: false})); 
// Parse JSON bodies(as sent by API clients)
// make sure the value we grabbed from the form, it comes in JSON
app.use(express.json()); 
app.use(cookieParser()); 

// define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth')); 
app.use('/books', require('./routes/books')); 

port_number = 3002;
app.listen(port_number, function () {
    console.log(`server started at ${port_number}`);
});
