const express = require('express');
const middleware = require('../middleware')
const Reservation = require('../../models/Reservations');

const router = express.Router();

// Returns a list of reservations
router.get('/', middleware.verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    req.query.room_id ? (mongoQuery.room_id = req.query.room_id) : '';
    req.query.user_id ? (mongoQuery.user_id = req.query.user_id) : '';

    try {
        req.query.reservation_lte ? (mongoQuery.reserved_to = { '$lte': new Date(req.query.reservation_lte).toISOString() }) : '';
        req.query.reservation_gte ? (mongoQuery.reserved_from = { '$gte': new Date(req.query.reservation_gte).toISOString() }) : '';
    } catch (err) {
        console.log(err)
    }

    // Find Reservations based on specified query
    const reservations = await Reservation.find(mongoQuery);
    res.send(reservations);
});

module.exports = router;