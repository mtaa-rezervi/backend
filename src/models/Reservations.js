const mongoose = require('mongoose');
const Schema = mongoose;

const reservationSchema = new mongoose.Schema({
    room_id: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    reserved_from: { type: Date, required: true },
    reserved_to: { type: Date, required: true }
}, {versionKey: false});

reservationSchema.set('timestamps', {
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

module.exports = mongoose.model('Reservation', reservationSchema);