const mongoose = require("mongoose");

const AuthUser = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AuthUser', AuthUser);