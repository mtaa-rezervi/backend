const mongoose = require('mongoose');

const reservationsSubSchema = mongoose.Schema({
    name: String
}, { _id : false });

const roomSchema = new mongoose.Schema({
    name: String,
    floor: Number,
    room_number: Number,
    info: String,
    number_of_seats: Number,
    amenities: [String],
    thumbnail_url: String,
    image_urls: [String],
    reservations: [reservationsSubSchema]
}, {versionKey: false});

module.exports = mongoose.model('Room', roomSchema);