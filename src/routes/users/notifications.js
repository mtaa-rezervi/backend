const express = require('express');
const { verifyJWT, verifyUserID } = require('../middleware');
const mongoose = require('mongoose');
const Users = require('../../models/Users');

const router = express.Router({ mergeParams: true });

// Returns a list of users notifications
router.get('/', verifyJWT, verifyUserID, async (req, res) => {
    try {
        const user = await Users.findById(mongoose.Types.ObjectId(req.params.id), '_id notifications');
        if (!user) throw 'Record doesnt exist';
        res.send(user)
    } catch (err) {
        res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }
});


module.exports = router;