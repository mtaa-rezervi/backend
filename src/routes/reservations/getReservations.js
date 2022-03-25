const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Reservation = require('../../models/Reservations');

// Returns a list of reservations
router.get('/', middleware.verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    req.query.room_id ? (mongoQuery.room_id = req.query.room_id) : '';
    req.query.user_id ? (mongoQuery.user_id = req.query.user_id) : '';

    // Find Reservations based on specified query
    const reservations = await Reservation.find(mongoQuery);
    res.send(reservations);
});

module.exports = router;