const express = require('express');
const router = express.Router();

// DOESNT WORK !!!! //

// /chat routes //
router.use('/', require('./chat'));

module.exports = router