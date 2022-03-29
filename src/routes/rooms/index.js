const express = require('express');
const router = express.Router();

// /rooms routes //
router.use('/', require('./getRooms'));
router.use('/', require('./getRoom'));

// /{id}
router.use('/', require('./createRoom'));
router.use('/', require('./deleteRoom'));

module.exports = router;