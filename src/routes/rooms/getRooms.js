const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');

// Returns a list of rooms
router.get('/', middleware.verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    // name
    req.query.name ? (mongoQuery.name = req.query.name) : '';
    // gte
    req.query.num_of_seats_gte ? (mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte }) : '';
    // lte
    req.query.num_of_seats_lte ? (mongoQuery.number_of_seats = { $lte: req.query.num_of_seats_lte }) : '';
    // gte && lte
    (req.query.num_of_seats_gte && req.query.num_of_seats_lte) ? (mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte, $lte: req.query.num_of_seats_lte }) : '';

    // Find Rooms based on specified query
    const rooms = await Room.find(mongoQuery);
    console.log(mongoQuery, rooms.length);
    res.send(rooms);
});

module.exports = router;