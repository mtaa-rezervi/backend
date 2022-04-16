const express = require('express');
const { verifyJWT } = require('../middleware');
const Room = require('../../models/Rooms');
const Reservations = require('../../models/Reservations');

const router = express.Router();

// Returns a list of rooms
router.get('/', verifyJWT, async (req, res) => {
    let mongoQuery = {};
    
    req.query.name ? (mongoQuery.name = new RegExp(`^${req.query.name}$`)) : '';
    req.query.amenity ? (mongoQuery.amenities = { $all: req.query.amenity }) : '';
    req.query.owner_id ? (mongoQuery.owner_id = req.query.owner_id) : '';
    req.query.id ? (mongoQuery._id = { $in: req.query.id }) : '';
    req.query.street ? (mongoQuery['address.street'] = new RegExp(`^${req.query.street}$`)) : '';
    req.query.city ? (mongoQuery['address.city'] = new RegExp(`^${req.query.city}$`)) : '';
    req.query.zip ? (mongoQuery['address.zip'] = new RegExp(`^${req.query.zip}$`)) : '';
    req.query.state ? (mongoQuery['address.state'] = new RegExp(`^${req.query.state}$`)) : '';

    //console.log(mongoQuery)

    // num_of_seats_gte, num_of_seats_lte
    if (req.query.num_of_seats_gte && req.query.num_of_seats_lte) {
        mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte, $lte: req.query.num_of_seats_lte };
    }
    else if (req.query.num_of_seats_gte) {
        mongoQuery.number_of_seats = { $gte: req.query.num_of_seats_gte };
    }
    else if (req.query.num_of_seats_lte) {
        mongoQuery.number_of_seats = { $lte: req.query.num_of_seats_lte }
    }

    // reservation_gte, reservation_lte
    if (req.query.vacant_to || req.query.vacant_from) {
        let reservationQuery = {};

        try {
            req.query.vacant_from ? (reservationQuery.reserved_to = { '$gt': new Date(req.query.vacant_from).toISOString() }) : '';
            req.query.vacant_to ? (reservationQuery.reserved_from = { '$lt': new Date(req.query.vacant_to).toISOString() }) : '';
            const reservations = await Reservations.find({ $or: [reservationQuery] }, '_id');

            mongoQuery.reservations = { $not: { $in: reservations }};
        } catch (err) {
            console.log(err)
        }
    };
    
    // Find Rooms based on specified query
    try {
        const rooms = await Room.find(mongoQuery, '_id name info amenities number_of_seats thumbnail_url').sort({ created_at: -1 });
        res.status(200).send(rooms);
    } catch {
        res.status(200).send([]);
    }
});

module.exports = router;