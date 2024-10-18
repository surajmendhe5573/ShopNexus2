require('dotenv').config(); 
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./production.constant');
} else if (process.env.NODE_ENV === 'development') {
    console.log("process.env.ENV", process.env.NODE_ENV);
    module.exports = require('./develop.constant');
} else {
    console.log("process.env.ENV", process.env.NODE_ENV);
    module.exports = require('./local.constant');
}
