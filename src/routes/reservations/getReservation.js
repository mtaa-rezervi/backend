const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Reservation = require('../../models/Reservations');
const mongoose = require('mongoose')

// Returns reservation based on specified id
router.get('/:id', middleware.verifyJWT, async (req, res) => {
    try {
        const reservation = await Reservation.findById(mongoose.Types.ObjectId(req.params.id));
        if (!reservation) throw 'Record doesnt exist';
        res.send(reservation);
    } catch (err) {
        res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }
});


module.exports = router;