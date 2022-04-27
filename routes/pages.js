const express = require('express');
// const authController = require('../controllers/auth');          // load a module
// const questionController = require('../controllers/question');   // load a module
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const session = require("express-session");

//Initialize passport
router.use(session({
    secret: "MyLittleSecretThatIdontWantOthersToKnow",
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());


mongoose.connect('mongodb://localhost:27017/bookDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

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
    cart:[
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

router.get('/', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/index.html") );
    // res.sendFile( "./views/index.html" );
});

router.get('/admin-orders', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/order-admin-page.html") );
});

router.get('/admin-donations', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-admin-page.html") );
});

router.get('/signin', (req,res) => {
    // Test
    console.log("GET /signin");
    res.sendFile( path.join(__dirname, "../public/views/signin.html") );
});

router.get('/signup', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signup.html") );
});

router.get('/each_order', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/each_order.html") );
});

router.get('/get_current_user', (req,res) => {
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

router.get('/book_list', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/book_list.html") );
});

router.get('/get_all_books', (req,res) => {
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


router.get('/purchase', (req,res) => {
    if (req.isAuthenticated()){
        res.sendFile( path.join(__dirname, "../public/views/purchase.html") );
    }
    else{
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


// router.get('/index', authController.isLoggedIn, (req,res) => {
//     if (req.user) {
//         res.render('index', {
//             user: req.user
//         }); 
//     } else {
//         res.render('index');
//     }
// });


// router.get('/tags', authController.isLoggedIn, questionController.populateTags, (req,res) => {
//     if (req.user) {
//         res.render('list_of_tags', {
//             user: req.user,
//             list_of_tags: req.tags_list
//         }); 
//     } else {
//         res.render('index');
//     }
// });


// router.get('/users', authController.isLoggedIn, authController.populateUsers, (req,res) => {
//     if (req.user) {
//         res.render('list_of_users', {
//             user: req.user,
//             list_of_users: req.users_list
//         }); 
//     } else {
//         res.render('index');
//     }
// });


// router.get('/register', (req,res) => {
//     if (req.session) {
//         res.render('register', {
//             message_fail: req.session.message_fail,
//             message_success: req.session.message_success
//         });
//     } else {
//         res.render('register'); 
//     }
//     delete req.session.message_fail;
//     delete req.session.message_success;
// });


// router.get('/login', (req,res) => {
//     res.render('login', {
//         message: req.session.message
//     });
//     delete req.session.message; 
// });


// router.get('/each_question/id=:id', authController.isLoggedIn, questionController.questionInfo, (req,res) => {
//     if(req.user) {
//         res.render('each_question', {
//             user: req.user,
//             instance: req.instance
//         });
//     } else {
//         res.redirect('/login');
//     }
// });


// router.get('/profile/:userid/:fname:lname', authController.isLoggedIn, authController.userProfileInfo, (req,res) => {
//     if (req.user) {
//         res.render('profile', {
//             user: req.user, 
//             instance: req.instance
//         }); 
//     } else {
//         res.redirect('/login'); 
//     }
// });


// router.get('/settings', authController.isLoggedIn, (req,res) => {
//     if (req.user) {
//         res.render('settings', {
//             user: req.user,
//             message_fail: req.session.message_fail,
//             message_success: req.session.message_success
//         }); 
//     } else {
//         res.redirect('/login'); 
//     }
//     delete req.session.message_fail;    
//     delete req.session.message_success;
// });


// router.get('/logout', (req,res) => {
//     res.render('logout'); 
// });


// router.get('/question', authController.isLoggedIn, (req,res) => {
//     if (req.user) {
//         res.render('question', {
//             user: req.user, 
//             message_fail: req.session.message_fail,
//             message_success: req.session.message_success
//         }); 
//     } else {
//         res.redirect('/login'); 
//     }

//     delete req.session.message_fail;
//     delete req.session.message_success;
// });

module.exports = router; 



