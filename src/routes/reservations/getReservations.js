const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Reservation = require('../../models/Reservations')

// Returns a list of reservations
router.get('/', middleware.verifyJWT, async (req, res) => {
    const reservations = await Reservation.find();
    res.send(reservations);
});

module.exports = router;