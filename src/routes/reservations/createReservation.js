const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');
const User = require('../../models/Users');
const Reservation = require('../../models/Reservations')
const mongoose = require('mongoose')

// Creates a new reservation
router.post('/', middleware.verifyJWT, async (req, res) => {
    const newReservation = await Reservation.create({
        room_id: req.body.room_id,
        user_id: req.body.user_id,
        reserved_from: req.body.reserved_from,
        reserved_to: req.body.reserved_to
    });

    await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user_id), { $push: { active_reservations: newReservation._id } });
    await Room.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.room_id), { $push: { reservations: newReservation._id } });

    res.status(201).send(newReservation);
});

module.exports = router;