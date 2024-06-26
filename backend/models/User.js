const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: String,
    password: {
        type: String,
        required: true
    },
    contactNo: String,
    institution: String,
    bio: String,
    profileImage: String,
    language: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Ensures only these values are allowed
        default: 'other'
    },
    reputation: {
        type: Number,
        default: 0
    },
    solvedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    rank: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);
