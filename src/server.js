const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();

// Connect to mongo
mongoose.connect(process.env.DB_CONNECTION_PRO, () => console.log('Mongo connected'));

// Default route
app.get('/', (req, res) => {
    res.send('<font face="Trebuchet MS" size="20px" color="#03a5fc"> Hello ✌️</font>');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/rooms', require('./routes/rooms'));
app.use('/reservations', require('./routes/reservations'));

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('Server running'));
