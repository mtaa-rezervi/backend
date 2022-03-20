const mongoose = require('mongoose');
const Schema = mongoose;

/*
const reservationsSubSchema = mongoose.Schema({
    name: String
}, { _id : false });
*/

const roomSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    floor: { type: Number, default: -100 },
    room_number: { type: Number, default: -100 },
    info: { type: String, default: '' },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
    }, 
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    number_of_seats: { type: Number, default: -100 },
    amenities: [String],
    thumbnail_url: { type: String, default: '' },
    image_urls: [String],
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {versionKey: false});

module.exports = mongoose.model('Room', roomSchema);