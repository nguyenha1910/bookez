const express = require('express');
const authController = require('../controllers/auth');          // load a module
const booksController = require('../controllers/books')
const mongoose = require("mongoose");
const path = require("path");
const passportLocalMongoose = require("passport-local-mongoose");    // load a module
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

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email cannot be empty"],
        minLength: 2
    },
    fname: {
        type: String,
        required: [true, "Firstname cannot be empty"],
    },
    lname: {
        type: String,
        required: [true, "Lastname cannot be empty"],
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
    },
    user_type: {
        type: String
    },
    cart:[
        {
            book_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
        }
    ]
});

// const User = mongoose.model('User', userSchema);

router.get('/get_cart_by_id', (req,res) => {
    if (req.isAuthenticated()){
        res.sendFile( path.join(__dirname, "../public/views/cart.html") );
    }
    else{
        res.redirect("/signin");
    }
});

router.post('/add_to_cart',(req, res)=>{
    //Users need to log in to add a book to their cart
    if (req.isAuthenticated) {
        // Save the book to the cart list inside User schema
        const book_id = req.body.book_id;
        const user_id = req.user._id;
        User.updateOne(
            {
                _id: user_id,
                // 'cart.book_id': {$ne: book_id}
            },
            {
                $push: {
                    cart: book_id
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error"
                    });
                } else {
                    res.send({
                        message: "success"
                    });
                }
            }
        );
    } else {
        // navigate to the login page
        res.send({
            message: "login required",
            redr: "/signin.html"
        });
        res.redirect('/signin');
    }
});

module.exports = router;
