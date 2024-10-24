const express = require('express');
const dotenv = require('dotenv').config();
const constant = require('./config/keys');

const app = express();

const Port = process.env.PORT || constant.PORT || 6000;
const env = process.env.NODE_ENV || constant.NODE_ENV || 'development';

// Middleware to parse incoming JSON requests
app.use(express.json());

require('./db/DB'); 

app.get('/', (req, res) => {
    res.send('Jai Shree Ram');
});

// User routes
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
app.use('/api/carts', require('./routes/cart')); 
app.use('/api/reviews', require('./routes/review'));
app.use('/api/shipping', require('./routes/shipping'));
app.use('/api/coupons', require('./routes/coupon'));
app.use('/api/contacts', require('./routes/contactMail'));

// Start the server and log the port and environment being used
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port} in ${env} environment`);
});
