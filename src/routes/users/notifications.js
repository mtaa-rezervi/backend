const express = require('express');
const router = express.Router({ mergeParams: true });
const middleware = require('../middleware')
const mongoose = require('mongoose');
const Users = require('../../models/Users');

// Returns reservation based on specified id
router.get('/', middleware.verifyJWT, async (req, res) => {
    try {
        const user = await Users.findById(mongoose.Types.ObjectId(req.params.id), '_id notifications');
        if (!user) throw 'Record doesnt exist';
        res.send(user)
    } catch (err) {
        res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }
});


module.exports = router;