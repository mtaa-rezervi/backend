const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');
const middleware = require('./middleware')

router.get('/', middleware.verifyJWT, async (req, res) => {
    const room = await Room.find({});
    res.send(room);
});

module.exports = router;

/*
    await Room.create({
        name: "Room 1",
        floor: 2,
        room_number: 1,
        info: "A very nice room",
        number_of_seats: 6,
        amenities: [
            "wifi",
            "power outlet",
            "white board"
        ],
        thumbnail_url: "someurl.com/thumbnail",
        image_urls: [
            "someurl.com/image1",
            "someurl.com/image2",
            "someurl.com/image3"
        ],
        reservations: [
            {
                "name": "reservation1"
            },
            {
                "name": "reservation2"
            }
        ]
    });
    */