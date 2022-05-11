const express = require('express');
const router = express.Router();

// /chat routes //
router.use('/', require('./saveMessage'));
router.use('/', require('./getMessages'));

router.use('/dms', require('./getDms'));

module.exports = router;