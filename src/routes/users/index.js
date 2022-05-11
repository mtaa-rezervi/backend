const express = require('express');
const router = express.Router();

// /users routes //
router.use('/login', require('./login'));
router.use('/register', require('./register'));

router.use('/all', require('./getAllUsers'));
router.use('/:id', require('./getUser'));
router.use('/:id', require('./updateUser'));

router.use('/:id/history', require('./getHistory'));
router.use('/:id/active-reservations', require('./getActiveReservations'));
router.use('/:id/notifications', require('./notifications'));
router.use('/:id/active-listings', require('./activeListings'));

module.exports = router;