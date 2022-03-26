const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');
const Reservation = require('../../models/Reservations');
const User = require('../../models/Users');
const mongoose = require('mongoose');

// Deletes a single room based on specified id
router.delete('/:id', middleware.verifyJWT, async (req, res) => {    
    try {
        var roomID = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
        return res.status(404).send({ error: { message: 'Record doesnt exist' } }); 
    }

    const room = await Room.findById(roomID);
    if (!room) return res.status(404).send({ error: { message: 'Record doesnt exist' } }); 

    // Remove specified Room reference from Users (owner) active listings
    await User.findByIdAndUpdate(room.owner_id, { $pull: { active_listings: roomID }});
    
    // Remove Room from active reservations of Users
    await User.updateMany({ active_reservations: { $in: roomID } }, { $pull: { active_reservations: roomID } });

    // Remove Reservations for specified Room
    await Reservation.deleteMany({ room_id:  roomID});

    // Remove specified Room
    await Room.deleteOne({ _id: roomID });

    res.status(204).send();
});

module.exports = router;

// await User.findByIdAndUpdate(reservation.user_id, { $pull: { active_reservations: reservationID }});
// await Room.findByIdAndUpdate(reservation.room_id, { $pull: { reservations: reservationID }});