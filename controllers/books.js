const mongoose = require('mongoose');

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
        default: 0
    }
}


// Compile these schema into a model --> a class
const Book = mongoose.model('Book', bookSchema);
/* Content:
    1. ask_fn
    2. populateQuestions
    3. populateQuestionsWithTag
    4. populateTags
    5. questionInfo
*/



