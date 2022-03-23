const mongoose = require('mongoose');
const Schema = mongoose;

/*
const reservationsSubSchema = mongoose.Schema({
    name: String
}, { _id : false });
*/

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    floor: { type: Number, required: true },
    room_number: { type: Number, required: true },
    info: { type: String, default: '' },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    }, 
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
    number_of_seats: { type: Number, required: true },
    amenities: [String],
    thumbnail_url: { type: String, default: '' },
    image_urls: [String],
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {versionKey: false});

module.exports = mongoose.model('Room', roomSchema);