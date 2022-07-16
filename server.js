const express = require("express");
const bodyParser = require('body-parser');
const path = require('path'); 
const dotenv = require('dotenv'); 
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
var session = require('cookie-session');
//Add sessions
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');

dotenv.config({ path: './.env'}); 

const app = express();

// for deployment
// require('./middleware/production')(app); 
const uri = process.env.MONGODB_URI;
console.log(uri);

mongoose.connect('mongodb://localhost:27017/bookDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

// ------------------------------------------------
// const bookSchema = {
//     book_name: String,
//     author_name: String,
//     price: { type: Number, default: 0 },
// };

// const Book = mongoose.model('Book', bookSchema);

// const bookList = [];

// fs.createReadStream(__dirname+'/data/bookez_data.csv')
//     .pipe(csv())
//     .on('data', (data) => bookList.push(data))
//     .on('end', () => {
//         console.log(bookList[0]);
//         // Do the database insertMany here
//         Book.insertMany(bookList, {}, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("All data loaded");
//                 mongoose.connection.close();
//             }
//         });
//     });
//--------------------------------------------------





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
app.use('/order_and_donation', require('./routes/order_and_donation')); 

port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`server started at ${port}`);
});


