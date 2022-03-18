const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const bcrypt = require('bcrypt')

// Register enpoint
router.post('/register', async (req, res) => {
    const emailExists = await User.exists( { 'credentials.email': req.body.email });
    if (emailExists) return res.status(409).send({ error: { message: 'Email already in use' }});
    
    const usernameExists = await User.exists({ 'credentials.username': req.body.username });
    if (usernameExists) return res.status(409).send({ error: { message: 'Username already in use' }});

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
    res.status(201).send(newUser);
});


// Login enpoint
router.post('/login', async (req, res) => {
    // Check whether username or email exists
    const user = await User.findOne({ $or: [
        { 'credentials.email': req.body.email },
        { 'credentials.username': req.body.username } ]
    });
    if (!user) return res.status(404).send({ error: { message: 'Password or username is wrong' }});

    // Compare password to saved hash
    const correctPassword = await bcrypt.compare(req.body.password, user.credentials.password)
    if (!correctPassword) return res.status(404).send({ error: { message: 'Password or username is wrong' }});

    res.status(200).send({ message: 'Successful login' })
});

module.exports = router;