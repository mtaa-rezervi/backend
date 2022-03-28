const express = require('express');
const router = express.Router({ mergeParams: true });
const middleware = require('../middleware')
const User = require('../../models/Users');
const mongoose = require('mongoose');

// Returns reservations history for a single user based on specified user id
router.get('/', middleware.verifyJWT, async (req, res) => {    
    try {
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { reservation_history: 1 });
        if (!user) throw 'Record doesnt exist';
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }
});

module.exports = router;