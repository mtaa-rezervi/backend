const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const Room = require('../../models/Rooms');
const User = require('../../models/Users');
const Reservation = require('../../models/Reservations')
const mongoose = require('mongoose')
const Joi = require('joi')

// Room and User ID validation methods
async function roomIDValidation(id) {
    try {
        const roomExists = await Room.exists({ _id: id });
        if (!roomExists) throw 'Wrong room_id';
        return null;
    } catch {
        return { field: 'room_id', message: 'wrong room_id' };
    }
}

async function userIDValidation(id) {
    try {
        const userExists = await User.exists({ _id: id });
        if (!userExists) throw 'Wrong user_id';
        return null;
    } catch {
        return { field: 'user_id', message: 'wrong user_id' };
    }
}

// Creates a new reservation
router.post('/', middleware.verifyJWT, async (req, res) => {
    let errorMessages = { errors: [] }

    // Schema for validating request body
    const schema = Joi.object({
        room_id: Joi.string().hex().length(24).required(),
        user_id: Joi.string().hex().length(24).required(),
        reserved_from: Joi.date().iso().required(),
        reserved_to: Joi.date().iso().required()
    });

    // Validate request body
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        var errorFields = error.details.map(x => (x.path[0]));
        error.details.map(x => (errorMessages.errors.push({ 'field': x.path[0], 'message': x.message.replace(/"/g, '') })));
    }

    // Check whether specified User or Room exists
    if (!errorFields || !errorFields.includes('user_id')) {
        error = await userIDValidation(req.body.user_id);
        if (error) errorMessages.errors.push(error);
    } 
    if (!errorFields || !errorFields.includes('room_id')) {
        error = await roomIDValidation(req.body.room_id);
        if (error) errorMessages.errors.push(error);
    }

    // Send error messages
    if (errorMessages.errors.length > 0) {
        return res.status(422).send(errorMessages);
    }

    // Create new reservation
    const newReservation = await Reservation.create({
        room_id: req.body.room_id,
        user_id: req.body.user_id,
        reserved_from: req.body.reserved_from,
        reserved_to: req.body.reserved_to
    });

    // Updates arrays in specified User and Room
    await User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user_id), { $push: { active_reservations: newReservation._id } });
    await Room.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.room_id), { $push: { reservations: newReservation._id } });

    res.status(201).send(newReservation);
});

module.exports = router;