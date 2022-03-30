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
    const activeRes = await Reservation.find({ room_id: roomID });
    const notificationText = "Room named \"" + room.name + "\" that you had reservation for has just been removed. Your reservation has been cancelled.";
    await User.updateMany({ active_reservations: { $in: activeRes } }, {
        $pull: { active_reservations: { $in: activeRes } },
        $push: {
            notifications: { 
                time: new Date(Date.now()),
                type: "removed_listing",
                text: notificationText }
            }
        }
    );

    // Remove Reservations for specified Room
    await Reservation.deleteMany({ room_id: roomID});

    // Remove specified Room
    await Room.deleteOne({ _id: roomID });

    res.status(204).send();
});

module.exports = router;