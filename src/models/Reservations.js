const mongoose = require('mongoose');
const Schema = mongoose;

const reservationSchema = new mongoose.Schema({
    room_id: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    reserved_from: { type: Date, required: true },
    reserved_to: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {versionKey: false});

module.exports = mongoose.model('Reservation', reservationSchema);