const express = require('express');
const router = express.Router();

// /chat routes //
router.use('/', require('./saveMessage'));
router.use('/', require('./getMessages'));

module.exports = router;