const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();

// Connect to mongo
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Mongo connected'));

// Default route
app.get('/', (req, res) => {
    res.send('<font face="Trebuchet MS" size="20px" color="#03a5fc"> Hello ✌️</font>');
});

// Import routes
const testRouter = require('./routes/test');

// Middleware
app.use(bodyParser.json());
app.use('/test', testRouter);

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('Server running'));