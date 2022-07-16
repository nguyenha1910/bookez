const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
// const dotenv = require("dotenv");

// dotenv.config({ path: './.env'});


const rawdata = fs.readFileSync(__dirname + "/data/bookez_data.csv");

const uri = process.env.MONGODB_URI;
const uri = 'mongodb://localhost:27017/bookDB';
console.log(uri);

mongoose.connect(uri,
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

// const bookSchema = {
//     book_name: String,
//     author_name: String,
//     price: { type: Number, default: 0 },
// };
//
// const Book = mongoose.model('Book', bookSchema);
//
// const bookList = [];
//
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
//
//
