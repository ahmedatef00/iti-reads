const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
    }

}, { timestamps: true });



const Author = mongoose.model('author', authorSchema);
module.exports = Author;
