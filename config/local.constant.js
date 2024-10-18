module.exports = {
    'MONGODB_URI': process.env.MONGODB_URI,

    'PORT': process.env.PORT,
    'NODE_ENV': process.env.NODE_ENV || 'local',

    "mailer": {
        "username": process.env.MAILER_USERNAME || '',
        "password": process.env.MAILER_PASSWORD || '',
        // Uncomment and use the below line if you have a SendGrid API Key in the .env
        // "sendGridAPIKey": process.env.SENDGRID_API_KEY || ''
    },

    "serverConfig": {
        "CORS": {
            "allowedHosts": process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : ['http://localhost:4000', 'http://localhost:5173']
        }
    },

    "jwtAuthSecret": process.env.JWT_AUTH_SECRET,
    "jwtRefreshSecret": process.env.JWT_REFRESH_SECRET,

    "urls": {
        "baseDomain": process.env.BASE_DOMAIN || "http://localhost:4000/api/v1/users/verify/"
    },

    // Email credentials, added from environment variables
    "emailCredentials": {
        "EMAIL_USER": process.env.EMAIL_USER,
        "EMAIL_PASS": process.env.EMAIL_PASS,
    },

    'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY || 'sk_test_51Q1m1wCoNCWkkOMwXnLk4MKLBGEfLBzV4ldWlhhN2QMkoAbRXjBLdIlxqBvbsCC1YoC5f2PY7zoLkuJCCm5Jqdog00S1vHTIIU'
};
