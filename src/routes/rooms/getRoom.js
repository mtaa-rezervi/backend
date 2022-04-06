const express = require('express');
const { verifyJWT } = require('../middleware');
const Room = require('../../models/Rooms');
const mongoose = require('mongoose');

const router = express.Router();

// Returns a single room based on specified id
router.get('/:id', verifyJWT, async (req, res) => {    
    try {
        const room = await Room.findById(mongoose.Types.ObjectId(req.params.id));
        if (!room) throw 'Record doesnt exist';
        res.status(200).send(room);
    } catch (err) {
        res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }
});

module.exports = router;