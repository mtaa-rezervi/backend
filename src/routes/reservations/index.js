const express = require('express');
const router = express.Router();

// /reservations routes //
router.use('/', require('./getReservations'));
router.use('/', require('./createReservation'));

// /{id}
router.use('/', require('./getReservation'));
router.use('/', require('./deleteReservation'));

module.exports = router;