const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Load the database URL from the environment variables or config files
const dbUrl = require('../config/keys').MONGODB_URI;

// Connect to MongoDB
const connectWithRetry = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database is connected');
    }).catch(err => {
        console.error('Database connection error. Retrying...', err);
        setTimeout(connectWithRetry, 5000); // Retry connection every 5 seconds
    });
};

// Initial connection attempt
connectWithRetry();

// MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    mongoose.disconnect();
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connection opened');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
    connectWithRetry();
});

module.exports = mongoose;
