const express = require('express');

const router = express.Router();

// DOESNT WORK !!!! //
router.get('/', async (req, res) => {
    const wss = req.app.get("wss")
    console.log(wss);

    wss.on('connection', (ws) => {
        console.log('new user')
        
        // send a message to the client
        ws.send('Welcome');

        // receive a message from the client
        ws.on('message', (message) => {
            console.log(message.toString())
    
            wss.clients.forEach((client) => {
                console.log(client.readyState)
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            })
        });
    })
});

module.exports = router