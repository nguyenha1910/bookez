const mongoose = require('mongoose');

// Create schemas
const orderSchema = new mongoose.Schema({
    user_id: String,
    date_and_time: { type: String, default: new Date().toString() } , 
    user_fname: String, 
    user_lname: String, 
    email: String, 
    phone_num: Number,
    street_name: String, 
    city: String,
    state: String,
    zip: Number,
    status: String,
    note: String
}) 

// Compile these schema into a model --> a class
const Orders = mongoose.model('Orders', orderSchema);












// Create schemas
const donationSchema = new mongoose.Schema({
    user_id: String,
    date_and_time: { type: String, default: new Date().toString() } , 
    user_fname: String, 
    user_lname: String, 
    email: String, 
    phone_num: Number,
    status: String,
    note: String, 
    books: Array
}) 

// Compile these schema into a model --> a class
const Donations = mongoose.model('Donations', donationSchema);