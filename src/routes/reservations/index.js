const express = require('express');
const router = express.Router();

// /reservations routes //
router.use('/', require('./getReservations'));
router.use('/', require('./createReservation'));

module.exports = router;