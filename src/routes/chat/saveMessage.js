const express = require('express');
const { verifyJWT } = require('../middleware');
const User = require('../../models/Users');
const Message = require('../../models/Messages');
const mongoose = require('mongoose')
const Joi = require('joi')

const router = express.Router();

// Room and User ID validation methods
const userIDValidation = async (id, field) => {
    try {
        const userExists = await User.exists({ _id: id });
        if (!userExists) throw 'Wrong user_id';
        return null;
    } catch {
        return { field: field, message: 'wrong user_id' };
    }
};

// Creates a new reservation
router.post('/', verifyJWT, async (req, res) => {
    let errorMessages = { errors: [] }

    // Schema for validating request body
    const schema = Joi.object({
        from: Joi.string().hex().length(24).required(),
        to: Joi.string().hex().length(24).required(),
        time: Joi.date().iso().required(),
        message: Joi.string().allow(null, '')
    });

    // Validate request body
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        var errorFields = error.details.map(x => (x.path[0]));
        error.details.map(x => (errorMessages.errors.push({ 'field': x.path[0], 'message': x.message.replace(/"/g, '') })));
    }

    const idFields = ['from', 'to'];
    for (const field of idFields) {
        // Check whether specified User exists
        if (!errorFields || !errorFields.includes(field)) {
            error = await userIDValidation(req.body[field], field);
            if (error) errorMessages.errors.push(error);
        } 
    }

    // Send error messages
    if (errorMessages.errors.length > 0) {
        return res.status(422).send(errorMessages);
    }

    // Create new reservation
    const newMessage = await Message.create({
        from: req.body.from,
        to: req.body.to,
        time: req.body.time,
        message: req.body.message
    });

    res.status(201).send(newMessage);
});

module.exports = router;