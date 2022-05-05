const express = require('express');

const router = express.Router();

// DOESNT WORK !!!! //
router.get('/', async (req, res) => {
    let wss = req.wss;
    console.log(wss);

    wss.on('connection', (ws) => {
        console.log('new user')

        // send a message to the client
        ws.send('Welcome client');

        // receive a message from the client
        ws.on('message', (data) => {
            console.log(data)
        });
    })
});

module.exports = router