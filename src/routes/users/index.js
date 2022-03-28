const express = require('express');
const router = express.Router();

// /users routes //
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/:id', require('./getUser'));
router.use('/:id/history', require('./history'));

module.exports = router;