const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const mongoose = require('mongoose');
const Reservation = require('../../models/Reservations');
const User = require('../../models/Users');
const Room = require('../../models/Rooms');

// Deletes reservation based on specified id
router.delete('/:id', middleware.verifyJWT, async (req, res) => {
    try {
        var reservationID = mongoose.Types.ObjectId(req.params.id)
    } catch (err) {
        return res.status(404).send({ error: { message: 'Record doesnt exist' } }); 
    }

    const reservation = await Reservation.findById(reservationID);
    if (!reservation) return res.status(404).send({ error: { message: 'Record doesnt exist' } }); 

    // Remove specified Reservation from User and Room
    await User.findByIdAndUpdate(reservation.user_id, { $pull: { active_reservations: reservationID }});
    await Room.findByIdAndUpdate(reservation.room_id, { $pull: { reservations: reservationID }});

    // Delete specified Reservation
    await Reservation.deleteOne({ _id: reservationID });

    res.status(204).send();
});


module.exports = router;