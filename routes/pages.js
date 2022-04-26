const express = require('express');
// const authController = require('../controllers/auth');          // load a module
// const questionController = require('../controllers/question');   // load a module
const router = express.Router();
const path = require('path');


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
    res.sendFile( path.join(__dirname, "../public/views/signin.html") );
});

router.get('/signup', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signup.html") );
});

router.get('/each_order', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/each_order.html") );
});

// frontend pages
router.get('/about', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/about.html") );
});

router.get('/thankyou', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/thankyou.html") );
});

router.get('/donation-form', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-form.html") );
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



