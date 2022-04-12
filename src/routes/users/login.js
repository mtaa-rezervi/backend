const express = require('express');
const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login enpoint
router.post('/', async (req, res) => {
    // Check whether username or email exists
    const user = await User.findOne({ $or: [
        { 'credentials.email': req.body.email },
        { 'credentials.username': req.body.username } ]
    });
    if (!user) return res.status(404).send({ error: { message: 'Password or username is wrong' }});

    // Compare password to saved hash
    const correctPassword = await bcrypt.compare(req.body.password, user.credentials.password)
    if (!correctPassword) return res.status(404).send({ error: { message: 'Password or username is wrong' }});

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({
        _id: user._id,
        username: user.credentials.username,
        token: token
    });
});

module.exports = router;