const express = require('express');
const { verifyJWT, verifyUserID } = require('../middleware');
const User = require('../../models/Users');
const mongoose = require('mongoose');

const router = express.Router({ mergeParams: true });

// Returns all users
router.get('/', verifyJWT, async (req, res) => {    
    try {
        const users = await User.find({}, {_id:1, "name.first_name": 1, "name.last_name": 1, "credentials.email": 1, "credentials.username": 1, profile_pic: 1});
        if (!users) throw 'There are no users';
        res.status(200).send(users);
    } catch (err) {
        res.status(404).send({ error: { message: 'No users' } });
    }
});

module.exports = router;