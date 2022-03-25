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
    notifications: [{ type: Object }]
}, {versionKey: false});

userSchema.set('timestamps', {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('User', userSchema);