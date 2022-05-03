const express = require('express');
// const questionController = require('../controllers/question');   // load a module
const router = express.Router();
const authController = require('../controllers/auth');          // load a module

const path = require('path');
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const validator = require('validator');

const session = require("express-session");

// mongoose.connect('mongodb://localhost:27017/bookDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

const bookSchema = new mongoose.Schema({
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
});

const Book = mongoose.model('Book', bookSchema);

const orderSchema = new mongoose.Schema({
    user_id: {
        user_id: String
            // {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    fname: {
        type: String,
        required: [true, "Firstname cannot be empty"],
    },
    lname: {
        type: String,
        required: [true, "Lastname cannot be empty"],
    },
    email: {
        type: String,
        // validate: [validator.isEmail, 'Invalid email']
    },
    phone_no: {
        type: String
    },
    str: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
        // 0: pending
        // 1: completed
    },
    note: {
        type: String
    },
    date_time:{
        type: String
    }
});

const Order = mongoose.model('Order', orderSchema);

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
    cart: [
        {
            book_id: {type: String}
                // {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
        }
    ]
});

const User = mongoose.model('User', userSchema);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/about.html"));
});


router.get('/admin-orders', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/order-admin-page.html"));
});

router.get('/admin-donations', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/donation-admin-page.html"));
});

router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/signin.html"));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/signup.html"));
});

router.get('/each_order', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/each_order.html"));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/about.html"));
});

router.get('/get_current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user
        });
    } else {
        res.send({
            message: "user not found",
            data: {}
        });
    }
});

router.get('/book_list', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/book_list.html"));
});

router.get('/book_detail', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/book_detail.html"));
});

router.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/thankyou.html"));
});

router.get('/donation-form', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/donation-form.html"));
});

router.get('/get_all_books', (req, res) => {
    console.log('GET /get_all_books');
    Book.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

router.get('/get_book_by_id', (req, res) => {
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

router.get('/get_books_by_ids', (req, res) => {
    Book.find({_id: {$in: req.query.book_ids}}, function (err, data) {
        if (err || data.length === 0) {
            res.send({
                "message": "internal database error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

router.get('/search_books', function (req, res) {
    console.log("GET /search_books");
    const search_key = req.query.search_key;
    console.log(search_key);
    Book.find({
        $or: [
            {book_name: {$regex: search_key, $options: 'i'}},
            {author_name: {$regex: search_key, $options: 'i'}},
            // {price: {$regex: search_key}}
        ]
    }, (err, data) => {
        if (err) {
            res.send({
                'message': 'search failed',
                'data': []
            });
        } else {
            // console.log(data);
            res.send({
                'message': 'success',
                'data': data
            });
        }
    });
});

router.get('/get_cart_by_id', (req, res) => {
    if (req.isAuthenticated()) {
        User.find({"_id": req.query.user_id}, function (err, data) {
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
    } else {
        res.redirect("/signin");
    }
});

router.post('/add_to_cart',function(req,res) {
    console.log("POST /add_to_cart");
    const book_id = req.body.book_id;
    const user_id = req.body.user_id;

    console.log("user_id", user_id);
    console.log("book_id", book_id);

    User.updateOne(
        {
            _id: user_id,
        },
        {
            $push: {
                cart: {book_id}
            }
        },
        {},
        (err) => {
            if (err) {
                console.log(err);
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
});

router.post('/purchase', authController.isLoggedIn, (req,res) => {
    if (req.user) {
        console.log("POST /purchase");
        if (req.body._id) {
            const order = {
                user_id: req.body.user_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_no: req.body.phone_no,
                email: req.body.email,
                address: req.body.address,
                apt: req.body.apt,
                state: req.body.state,
                zip: req.body.zip,
                note: req.body.note,
            }
            console.log(order);

            const newOrder = new Order(order);
            newOrder.save((err, new_order) => {
                if (err) {
                    console.log(err);
                    console.log("Failed to place order");
                    // res.send("Database error");
                    res.redirect("views/purchase.html?error_message=" + err['message']
                        + "&input=" + JSON.stringify(order));
                } else {
                    // Set cart field in User to empty list
                    User.find({"_id": req.query.user_id}, function (err, data) {
                        if (err || data.length === 0) {
                            console.log("Cannot find user with this id");
                        } else {
                            let update_user = data[0];
                            update_user.cart = [];

                            User.updateOne({_id: req.body.user_id},
                                {$set: update_user},
                                {runValidators: true},
                                (err, info) => {
                                    if (err) {
                                        res.redirect("views/profile.html?error_message=" + err['message']
                                            + "&input=" + JSON.stringify(car) + "&user_id=" + req.body.user_id);
                                    } else {
                                        // success
                                        res.redirect("views/profile.html?user_id=" + req.body.user_id);
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    } else {
        res.redirect("/signin");
    }
});

module.exports = router; 
