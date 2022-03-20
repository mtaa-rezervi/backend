const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// Register enpoint
router.post('/', async (req, res) => {
    // Checks whether username or email already exists
    const emailExists = await User.exists( { 'credentials.email': req.body.email });
    if (emailExists) return res.status(409).send({ error: { message: 'Email already in use' }});
    
    const usernameExists = await User.exists({ 'credentials.username': req.body.username });
    if (usernameExists) return res.status(409).send({ error: { message: 'Username already in use' }});

    // Creates a hash from the specified password
    const passwdHash = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
        name: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        },
        credentials: {
            email: req.body.email,
            username: req.body.username,
            password: passwdHash
        }
    });

    // Generate token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).send({
        _id: newUser._id,
        username: newUser.credentials.username,
        token: token
    });
});

module.exports = router;