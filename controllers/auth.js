const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const nodemailer = require("nodemailer");


// Create schemas
const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String, 
    email: String,
    password: String, 
    user_type: { type: Number, default: 0 }, 
    cart: Array
});
userSchema.methods.generateAuthToken = function() {
    const id = this._id; 
    const first_name = this.first_name; 
    const last_name = this.last_name; 
    const email = this.email; 
    const grad_year = this.grad_year;
    const role = this.role;
    const major = this.major;
    const profile_picture = this.profile_picture;
    const token = jwt.sign( { id: id, fname: first_name, lname: last_name, grad_year: grad_year, email: email, 
                            role: role, major: major, profile_picture: profile_picture }, 
                            process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN} 
    );
    return token; 
}; 

// Compile these schema into a model --> a class
const Users = mongoose.model('Users', userSchema); 














