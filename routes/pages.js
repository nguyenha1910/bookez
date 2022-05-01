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
});


router.get('/about', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/about.html") );
});


router.get('/admin-orders', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/order-admin-page.html") );
});

router.get('/admin-donations', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-admin-page.html") );
});

router.get('/signin', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signin.html") );
});

router.get('/register', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signup.html") );
});

router.get('/each_order', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/each_order.html") );
});

router.get('/about', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/about.html") ); 
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

router.get('/thank-you', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/thankyou.html") );
});

router.get('/donation-form', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-form.html") );
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







module.exports = router; 
