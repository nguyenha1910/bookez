const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 


// Create schemas
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
    user_type: { type: Number, default: 0 },
    cart:[
        {
            book_id: String
                // {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
        }
    ]
});

userSchema.methods.generateAuthToken = function() {
    const id = this._id; 
    const first_name = this.fname; 
    const last_name = this.lname; 
    const email = this.email; 
    const user_type = this.user_type;
    const cart = this.cart;
    const token = jwt.sign( { id: id, fname: first_name, lname: last_name, email: email, 
                            user_type: user_type, cart: cart }, 
                            process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN} 
    );
    return token; 
}; 

// Compile these schema into a model --> a class
const User = mongoose.model('Users', userSchema); 













// ************************************************************** Register, Login and Logout **************************************************************
// A FUNCTION to handle a POST request for register
exports.register_fn = (req, res) => {
    console.log("Register body: ", req.body); 
    const { first_name, last_name, email, password, password_confirm } = req.body; 

    // Insert the new account into our database
    async function insertNewAcc() {
        // Encrypt password
        let hashedPassword = await bcrypt.hash(password, 8);
        const newAcc = new User({
            email: email,
            fname: first_name,
            lname: last_name,
            email: email,
            password: hashedPassword
        })

        const result = await newAcc.save(); 
        console.log(result);

        // if (result) {
        //     req.session.message_success = 'User registered'; 
        return res.redirect('/register'); 
        // }   
    }
    
    // Check for duplicate email
    async function getEmail() {
        const email_list = await User.find({ email: email });
        // console.log('Email list', email_list); 

        if (email_list.length > 0) {
            // req.session.message_fail = "Email has already been taken"; 
            console.log("Duplicate email"); 
            return res.redirect('/register'); 
        } else {
            console.log("Register successful for email ", email); 
            insertNewAcc(); 
        }
    }

    getEmail(); 
}



// A FUNCTION to handle a POST request for login
exports.login_fn = async (req, res) => {
    // console.log(req.body); 
    
    try {
        const { email, password } = req.body;
        console.log("password: ", password);
        // query db to check if the provided email and password are correct
        const email_list = await User.find({ email: email });
        // console.log('Email list', email_list); 
        const user = email_list[0]; 

        console.log("password: ", password);
        console.log("user.password: ", user.password);
        if ( email_list.length == 0 || !(await bcrypt.compare(password, user.password)) ) {
            // req.session.message = "Email or Password is incorrect"; 
            return res.redirect('/signin');
        } else {
            // create a token for each user
            const token = user.generateAuthToken(); 

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 
                ), 
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions); 
            // console.log("Token: ", token); 
            if (user.user_type === 0) {
                console.log("Normal users");
                res.status(200).redirect("/");     
            } else {
                console.log("Admins");
                res.status(200).redirect("/"); 
            }
        }
    } catch (error) {
        console.log(error); 
    }
}



// Check logged in status
exports.isLoggedIn = async (req, res, next) => {
    console.log("inside get user");
    const token = req.cookies.jwt; 
    if (!token) {
        res.send({
            message: "no user"
        });
    }; 

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        // // console.log( "isLoggedIn: ", req.user); 
        res.send({
            message: "user exists",
            data: decoded
        });
    } 
    catch (ex) {
        res.send({
            message: "no user"
        });
    }
}




// LOGOUT
exports.logout_fn = async (req, res) => {
    console.log("Someone wants to logout...");
    res.cookie('jwt', 'logout_fn', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    req.session = null;
    console.log("Someone has just logged out");
    res.status(200).redirect('/');
}

    
















