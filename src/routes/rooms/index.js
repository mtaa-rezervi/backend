const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');
const User = require('../../models/Users');
const mongoose = require('mongoose')

// /rooms endpoints //

// Returns a list of rooms
router.get('/', middleware.verifyJWT, async (req, res) => {
    const room = await Room.find();
    res.send(room);
});

// Creates a new room
router.post('/', middleware.verifyJWT, async (req, res) => {
    const newRoom = await Room.create({
        name: req.body.name,
        floor: req.body.floor,
        room_number: req.body.room_number,
        info: req.body.info,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        },
        owner_id: req.body.owner_id,
        number_of_seats: req.body.number_of_seats,
        amenities: req.body.amenities
    });

    //const user = await User.findById(mongoose.Types.ObjectId(req.body.owner_id));

    await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.owner_id), { $push: { active_listings: newRoom._id } });

    res.status(201).send(newRoom);
});

module.exports = router;