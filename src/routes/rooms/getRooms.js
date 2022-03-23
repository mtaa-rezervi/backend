const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');

// Returns a list of rooms
router.get('/', middleware.verifyJWT, async (req, res) => {
    const room = await Room.find();
    res.send(room);
});

module.exports = router;