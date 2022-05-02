const express = require('express');
// const authController = require('../controllers/auth');          // load a module
// const questionController = require('../controllers/question');   // load a module
const router = express.Router();
const authController = require('../controllers/auth');          // load a module

const path = require('path');
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const session = require("express-session");

//Initialize passport
// router.use(session({
//     secret: "MyLittleSecretThatIdontWantOthersToKnow",
//     resave: false,
//     saveUninitialized: false
// }));
// router.use(passport.initialize());
// router.use(passport.session());


// mongoose.connect('mongodb://localhost:27017/bookDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

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
    }
}

const Book = mongoose.model('Book', bookSchema);

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
            book_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
        }
    ]
});

// User passportLocalMongoose to process userSchema
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
// Convert obj to binary data
passport.serializeUser(User.serializeUser());
// Convert binary data to obj
passport.deserializeUser(User.deserializeUser());


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

router.get('/search_books', function (req, res) {
    console.log("GET /search_books");
    const search_key = req.query.search_key;
    console.log(search_key);
    Book.find({
        $or: [
            {book_name: {$regex: search_key, $options : 'i'}},
            {author_name: {$regex: search_key, $options : 'i'}},
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
        res.sendFile(path.join(__dirname, "../public/views/cart.html"));
    } else {
        res.redirect("/signin");
    }
});

router.post('/add_to_cart', (req, res) => {
    console.log("POST /add_to_cart");
    //Users need to log in to add a book to their cart
    if (req.isAuthenticated) {
        // Save the book to the cart list inside User schema
        const book_id = req.body.book_id;
        const user_id = req.user._id;

        User.updateOne(
            {
                _id: user_id,
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
            redr: "/signin"
        });
        // res.redirect('/signin');
    }
});

router.get('/purchase', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, "../public/views/purchase.html"));
    } else {
        res.redirect("/signin");
    }
});


// router.get('/questions_tagged/tag=:tag', authController.isLoggedIn, questionController.populateQuestionsWithTag, (req,res) => {
//     if (req.user) {
//         res.render('questions_tagged', {
//             user: req.user,
//             questionsTagged: req.questions, 
//             main_tag: req.main_tag
//         }); 
//     } else {
//         res.render('index');
//     }
// });


module.exports = router;
