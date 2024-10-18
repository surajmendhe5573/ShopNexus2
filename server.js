const express = require('express');
const dotenv = require('dotenv').config();
const constant = require('./config/keys');

const app = express();

// Port is fetched from environment variables or config file, with a fallback to 6000
const Port = process.env.PORT || constant.PORT || 6000;
// Environment is determined by the NODE_ENV variable or defaults to 'development'
const env = process.env.NODE_ENV || constant.NODE_ENV || 'development';

// Middleware to parse incoming JSON requests
app.use(express.json());

// Database connection initialization
require('./db/DB'); 

// Root route - basic health check or response
app.get('/', (req, res) => {
    res.send('Jai Shree Ram');
});

// User routes
app.use('/api/users', require('./routes/user'));

// Start the server and log the port and environment being used
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port} in ${env} environment`);
});
