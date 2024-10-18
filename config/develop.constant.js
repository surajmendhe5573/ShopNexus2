module.exports = {
    'MONGODB_URI': process.env.MONGODB_URI,
    'PORT': process.env.PORT || 4000,
    'NODE_ENV': process.env.NODE_ENV || 'development',
    "mailer": {
        "username": process.env.MAILER_USERNAME,
        "password": process.env.MAILER_PASSWORD,
        // Uncomment and use the line below if you have a SendGrid API key in your .env
        // "sendGridAPIKey": process.env.SENDGRID_API_KEY
    },
    "serverConfig": {
        "CORS": {
            "allowedHosts": process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : ['http://localhost:4000']
        }
    },
    "jwtAuthSecret": process.env.JWT_AUTH_SECRET,
    "jwtRefreshSecret": process.env.JWT_REFRESH_SECRET,
    "urls": {
        "baseDomain": process.env.BASE_DOMAIN || "http://localhost:4000/api/v1/users/verify/"
    }
};
