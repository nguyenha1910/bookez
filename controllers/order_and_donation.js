const mongoose = require('mongoose');

// Create schemas
const orderSchema = new mongoose.Schema({
    user_id: String,
    date_and_time: { type: String, default: new Date().toString() } , 
    user_fname: String, 
    user_lname: String, 
    email: String, 
    phone_num: String,
    street_name: String, 
    city: String,
    state: String,
    zip: String,
    status: { type: String, default: "Pending" },
    note: String
}) 

// Compile these schema into a model --> a class
const Order = mongoose.model('Orders', orderSchema);



// Create schemas
const donationSchema = new mongoose.Schema({
    user_id: String,
    date_and_time: { type: String, default: new Date().toString() } , 
    user_fname: String, 
    user_lname: String, 
    book_name: String, 
    edition: String, 
    author_name: String,
    condition: String,
    email: String, 
    phone_num: String,
    status:  { type: String, default: "Pending" },
    note: String, 
    books: Array
}) 

// Compile these schema into a model --> a class
const Donation = mongoose.model('Donations', donationSchema);





// ************************************************************** Donation **************************************************************
// A FUNCTION to handle a POST request for donate
exports.donate_fn = (req, res) => {
    console.log("Donate body: ", req.body); 

    // Insert the new account into our database
    async function insertNewDonation() {
        // let phone_number = req.body.phone_num.replaceAll('-', '') ;
        // console.log(phone_number);

        const newDonation = new Donation({
            user_id: req.body.user_id,
            user_fname: req.body.first_name,
            user_lname: req.body.last_name,
            book_name: req.body.book_name,
            edition: req.body.edition,
            author_name: req.body.author_name,
            condition: req.body.condition,
            email: req.body.email,
            phone_num: req.body.phone_num, 
            note: req.body.note
        })

        const result = await newDonation.save(); 
        console.log(result);

        // if (result) {
        //     req.session.message_success = 'User registered'; 
        return res.redirect('/thankyou'); 
        // }   
    }

    insertNewDonation(); 
}



exports.populateDonations = async (req, res, next) => {  
    try {
        const donation_list = await Donation.find({}); 

        if (!donation_list) return next();

        // var string = JSON.stringify(question_list);
        // var ques_list = JSON.parse(string);
        res.send({
            message: "successful",
            data: donation_list.reverse()
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


exports.get_donation_by_id = async (req, res, next) => {  
    console.log("inside BE");
    try {
        const instance = await Donation.find({_id: req.query.donation_id}); 
        
        // var string = JSON.stringify(oneQuestion);
        // var instance = JSON.parse(string);
        
        res.send({
            message: "retrieve donation instance successful",
            data: instance[0]
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}










// ************************************************************** Order **************************************************************
// A FUNCTION to handle a POST request for donate
exports.order_fn = (req, res) => {
    console.log("Order body: ", req.body); 

    // Insert the new account into our database
    async function insertNewOrder() {
        const newOrder = new Order({
            user_id: req.body.user_id,
            user_fname: req.body.first_name,
            user_lname: req.body.last_name,
            email: req.body.email,
            phone_num: req.body.phone_num,
            street_name: req.body.address, 
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            note: req.body.note
        })

        const result = await newOrder.save(); 
        console.log(result);

        // if (result) {
        //     req.session.message_success = 'User registered'; 
        return res.redirect('/thankyou'); 
        // }   
    }

    insertNewOrder(); 
}



exports.populateOrders = async (req, res, next) => {  
    try {
        const order_list = await Order.find({}); 

        if (!order_list) return next();

        // var string = JSON.stringify(question_list);
        // var ques_list = JSON.parse(string);
        res.send({
            message: "successful",
            data: order_list.reverse()
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


exports.get_order_by_id = async (req, res, next) => {  
    try {
        const instance = await Order.find({_id: req.query.order_id}); 
        
        // var string = JSON.stringify(oneQuestion);
        // var instance = JSON.parse(string);
        
        res.send({
            message: "retrieve order instance successful",
            data: instance[0]
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


