const mongoose = require('mongoose');

// Create schemas
const bookSchema = new mongoose.Schema({
    book_name: String,
    author_name: String, 
    price: { type: Number, default: 0 }
}) 

// Compile these schema into a model --> a class
const Books = mongoose.model('Books', bookSchema);


/* Content:
    1. ask_fn
    2. populateQuestions
    3. populateQuestionsWithTag
    4. populateTags
    5. questionInfo
*/



