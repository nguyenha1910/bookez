const express = require('express');
const orderdonationController = require('../controllers/order_and_donation');          // load a module
const router = express.Router();


// create a controller that can deal with all the data authentication
router.post('/donate', orderdonationController.donate_fn); 
router.get('/populateDonations', orderdonationController.populateDonations); 
router.get('/get_donation_by_id', orderdonationController.get_donation_by_id); 

router.post('/purchase', orderdonationController.order_fn); 
router.get('/populateOrders', orderdonationController.populateOrders); 
router.get('/get_order_by_id', orderdonationController.get_order_by_id); 

// router.post('/update_name', authController.isLoggedIn, authController.update_name_fn);


module.exports = router; 



