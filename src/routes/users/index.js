const express = require('express');
const router = express.Router();

// /users routes 
router.use('/login', require('./login'));
router.use('/register', require('./register'));

module.exports = router;