const express = require('express');
const router = express.Router();

// /users routes //
router.use('/login', require('./login'));
router.use('/register', require('./register'));

router.use('/:id', require('./updateUser'));
router.use('/:id/notifications', require('./notifications'));
router.use('/:id/active-listnings', require('./activeListings'));
module.exports = router;