const express = require('express');
const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const router = express.Router();

// Register enpoint
router.post('/', async (req, res) => {
     // Schema for validating request body
     const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().required(),
        password: Joi.string().alphanum().min(6).required()
    });

    // Validate request body
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(x => ({ 'field': x.path[0], 'message': x.message.replace(/"/g, '') }));
        return res.status(422).send({ errors: errorMessages });
    }

    // Check whether username or email already exists
    const emailExists = await User.exists( { 'credentials.email': req.body.email });
    if (emailExists) return res.status(409).send({ error: { message: 'Email already in use' }});
    
    const usernameExists = await User.exists({ 'credentials.username': req.body.username });
    if (usernameExists) return res.status(409).send({ error: { message: 'Username already in use' }});

    // Create a hash from the specified password
    const passwdHash = await bcrypt.hash(req.body.password, 10);

    // Create a new user and save them to the database
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