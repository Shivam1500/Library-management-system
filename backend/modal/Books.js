const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const BookModel = mongoose.model('books', bookSchema);
module.exports = BookModel;
