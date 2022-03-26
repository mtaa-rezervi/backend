const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');

// Returns a list of rooms
router.get('/', middleware.verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    // name
    if(req.query.name){
        mongoQuery.name = req.query.name;
    }

    // num_of_seats_gte, num_of_seats_lte
    if(req.query.num_of_seats_gte && req.query.num_of_seats_lte){
        mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte, $lte: req.query.num_of_seats_lte };
    }
    else if(req.query.num_of_seats_gte){
        mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte };
    }
    else if(req.query.num_of_seats_lte){
        mongoQuery.number_of_seats = { $lte: req.query.num_of_seats_lte }
    }

    // amenity
    if(req.query.amenity){
        mongoQuery.amenities = { $all: req.query.amenity }
    }
    // owner id
    if(req.query.owner_id){
        mongoQuery.owner_id = req.query.owner_id;
    }


    // Find Rooms based on specified query
    const rooms = await Room.find(mongoQuery);
    console.log(mongoQuery, rooms.length);
    res.send(rooms);
});

module.exports = router;