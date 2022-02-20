const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({ note: String });

const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    notes: [NoteSchema]
})

const User = mongoose.model('User', schema)
module.exports = User