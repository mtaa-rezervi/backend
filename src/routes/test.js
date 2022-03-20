const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');
const middleware = require('./middleware')

router.get('/', middleware.verifyJWT, async (req, res) => {
    /*
    await Room.create({
        name: "Room 1",
        floor: 2,
        room_number: 1,
        info: "A very nice room",
        address: {
            street: "Carrot st. 123",
            city: "CarrotVille",
            state: "Vegetable land",
            zip: "11122"
        },
        number_of_seats: 6,
        amenities: [
            "wifi",
            "power outlet",
            "white board"
        ],
        owner_id: "623729833bce46c2820e6aa9",
        thumbnail_url: "someurl.com/thumbnail",
        image_urls: [
            "someurl.com/image1",
            "someurl.com/image2",
            "someurl.com/image3"
        ],
    });
    */

    //const room = await Room.find({}).populate('owner_id');
    const room = await Room.find({});
    res.send(room);
});

module.exports = router;
