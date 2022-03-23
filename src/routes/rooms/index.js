const express = require('express');
const router = express.Router();

// /rooms routes //
router.use('/', require('./getRooms'));
router.use('/', require('./createRoom'));

module.exports = router;