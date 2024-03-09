const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    quantity: Number
});

const BookModel = mongoose.model('books', bookSchema);
