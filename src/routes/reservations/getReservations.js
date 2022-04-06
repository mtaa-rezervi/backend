const express = require('express');
const { verifyJWT } = require('../middleware');
const Reservation = require('../../models/Reservations');

const router = express.Router();

// Returns a list of reservations
router.get('/', verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    req.query.room_id ? (mongoQuery.room_id = req.query.room_id) : '';
    req.query.user_id ? (mongoQuery.user_id = req.query.user_id) : '';

    // Find Reservations based on specified query
    const reservations = await Reservation.find(mongoQuery);
    res.send(reservations);
});

module.exports = router;