const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { default: false }
})

const User = mongoose.model('User', schema)

module.exports = User