const mongoose = require('mongoose');

/*
const name = mongoose.Schema({
    first_name: String,
    last_name: String
}, { _id : false });

const credentials = mongoose.Schema({
    email: String,
    username: String,
    password: String
}, { _id : false });
*/

const userSchema = new mongoose.Schema({
    name: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
    },
    credentials: {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userSchema);