const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');

// Returns a single room based on specified id
router.get('/:id', middleware.verifyJWT, async (req, res) => {    
    try {
        const room = await Room.findById(req.params.id);
        if (!room) throw 'Room does not exist.';
        res.status(200).send(room);
    } catch (err) {
        res.status(404).send({ error: { message: 'Room was not found.' } });
    }
});

module.exports = router;