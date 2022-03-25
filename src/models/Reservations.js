const mongoose = require('mongoose');
const Schema = mongoose;

const reservationSchema = new mongoose.Schema({
    room_id: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    reserved_from: { type: Date, default: Date.now },
    reserved_to: { type: Date, default: Date.now }
}, {versionKey: false});

reservationSchema.set('timestamps', {
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

module.exports = mongoose.model('Reservation', reservationSchema);