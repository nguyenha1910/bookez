const express = require('express');
const authController = require('../controllers/auth');          // load a module
const booksController = require('../controllers/books')
const mongoose = require("mongoose");
const path = require("path");    // load a module
const router = express.Router();

// create a controller that can deal with all the data
// booking
const bookSchema = {
    book_name: {
        type: String,
        required: [true, "Book name cannot be empty"],
    },
    author_name: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    }
}

// Compile these schema into a model --> a class
// const Book = mongoose.model('Book', bookSchema);

router.get('/book_list', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/book_list.html") );
});

router.get('/get_book_by_id', (req,res) => {
    Book.find({"_id": req.query.book_id}, function (err, data) {
        if (err || data.length === 0) {
            res.send({
                "message": "internal database error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data[0]
            })
        }
    });
});


module.exports = router; 

