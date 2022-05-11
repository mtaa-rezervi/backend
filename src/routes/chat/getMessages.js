const express = require('express');
const { verifyJWT } = require('../middleware');
const Message = require('../../models/Messages');

const router = express.Router();

// Returns a list of reservations
router.get('/', verifyJWT, async (req, res) => {
    const mongoQuery = {
        $or: [
            { from: req.query.user1, to: req.query.user2 },
            { from: req.query.user2, to: req.query.user1 }
        ]
    };

    // Find Messages for specified users
    const messages = await Message.find(mongoQuery).sort({ time: 1 });
    res.send(messages);
});

module.exports = router;