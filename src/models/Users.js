const mongoose = require('mongoose');
const Schema = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
    },
    credentials: {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
    }, 
    profile_pic: { type: String, default: '' },
    reservation_history: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    active_reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    active_listings: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    notifications: [{ type: Object }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {versionKey: false});

module.exports = mongoose.model('User', userSchema);