const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/index.html") ); 
});

router.get('/about', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/about.html") );
});

router.get('/book_list', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/book_list.html") );
});

router.get('/contact', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/contact.html") );
});

router.get('/admin-orders', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/order-admin-page.html") );
});

router.get('/admin-donations', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-admin-page.html") );
});

router.get('/each_donation', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/each_donation.html") );
});

router.get('/signin', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signin.html") );
});

router.get('/register', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/signup.html") );
});

router.get('/cart', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/cart.html") );
});

router.get('/each_order', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/each_order.html") );
});

router.get('/thankyou', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/thankyou.html") );
});

router.get('/donation-form', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-form.html") );
});

router.get('/book_list', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/book_list.html") );
});

router.get('/thank-you', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/thankyou.html") );
});

router.get('/donation-form', (req,res) => {
    res.sendFile( path.join(__dirname, "../public/views/donation-form.html") );
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









module.exports = router; 
