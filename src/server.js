const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const http = require('http');
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const socketio = new Server(server);
/*
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server, path: '/chat' });
app.set("wss", wss)
*/

dotenv.config();

// Connect to mongo
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Mongo connected'));

// Default route
app.get('/', (req, res) => {
    res.send('<font face="Trebuchet MS" size="20px" color="#03a5fc"> Hello ✌️</font>');
});

// Middleware
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     req.wss = wss;
//     return next();
// });

// Routes
app.use('/users', require('./routes/users'));
app.use('/rooms', require('./routes/rooms'));
app.use('/reservations', require('./routes/reservations'));
//app.use('/chat', require('./routes/chat'))

/*
// Chat
wss.on('connection', (ws) => {
    // console.log('new user')
    
    // send a message to the client
    // ws.send('Welcome');

    // receive a message from the client
    ws.on('message', (message) => {
        console.log(message.toString())
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        })
    });

    ws.on('close', (data) => {
        console.log('disconnected')
        //console.log(data);
    });
})
*/


socketio.on("connection", socket => {
    //socket.removeAllListeners();
    console.log("client connected: ", socket.id);

    socket.on("join_room", data => {
        socket.join(data.room_name);
        console.log("user joined room: ", data.room_name);
    })

    socket.on("leave_room", data => {
        socket.leave(data.room_name);
        console.log("user left room: ", data.room_name);
    })

    socket.on("message", data => {
        console.log("message: ", data.message);
        console.log("from socket: ", socket.id);
        console.log("---------------");
        
        socketio.to(data.roomName).emit("message", data.message);
    })

    
});

// Start the server
server.listen(process.env.PORT || 3000, () => console.log('Server running'));
