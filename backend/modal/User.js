const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    issuedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    }]
})



const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

