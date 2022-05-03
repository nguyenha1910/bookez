const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

// const rawdata = fs.readFileSync(__dirname + "data/bookez_data.csv");

<<<<<<< HEAD

=======
>>>>>>> 9bd02c899897eabf79d3f3d8528f3956f0fff944
mongoose.connect('mongodb://localhost:27017/bookDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

<<<<<<< HEAD

=======
>>>>>>> 9bd02c899897eabf79d3f3d8528f3956f0fff944
const bookSchema = {
    book_name: String,
    author_name: String,
    price: { type: Number, default: 0 },
};

const Book = mongoose.model('Book', bookSchema);

const bookList = [];

fs.createReadStream(__dirname+'/data/bookez_data.csv')
    .pipe(csv())
    .on('data', (data) => bookList.push(data))
    .on('end', () => {
        console.log(bookList[0]);
        // Do the database insertMany here
        Book.insertMany(bookList, {}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("All data loaded");
                mongoose.connection.close();
            }
        });
    });
