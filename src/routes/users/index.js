const express = require('express');
const router = express.Router();

// /users routes //
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/:id', require('./getUser'));
router.use('/:id/history', require('./getHistory'));
router.use('/:id/active-reservations', require('./getActiveReservations'));

module.exports = router;