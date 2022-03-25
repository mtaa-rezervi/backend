const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Reservation = require('../../models/Reservations');

// Returns a list of reservations
router.get('/', middleware.verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    req.query.room_id ? (mongoQuery.room_id = req.query.room_id) : '';
    req.query.user_id ? (mongoQuery.user_id = req.query.user_id) : '';
    
    if (req.query.reservation_lte) {
        const reservation_lte = new Date(req.query.reservation_lte).toISOString();
        mongoQuery.reserved_from = { '$lte': reservation_lte };
    }; 

    if (req.query.reservation_gte) {
        const reservation_gte = new Date(req.query.reservation_gte).toISOString();
        mongoQuery.reserved_to = { '$gte': reservation_gte };
    }; 

    console.log(mongoQuery);

    const reservations = await Reservation.find(mongoQuery);
    res.send(reservations);
});

module.exports = router;