/**Authentication Middleware */
const jwt = require('jsonwebtoken');
const constant = require('../config/constant');
const { jwtAuthSecret } = require('../config/keys');

// authenticate user
const authenticate = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) return res.status(401).send({ error: 'You are not authorized to make this request' });

        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) return res.status(401).send({ error: 'You are not authorized to make this request' });

        jwt.verify(token, jwtAuthSecret, (err, user) => {
            if (err) {
                return res.status(401).send({ error: 'You are not authorized to make this request' });
            } else {
                if (user.status == (constant.status.DELETE || constant.status.DISABLED)) return res.status(401).send({ error: 'You are not authorized to make this request' });
                if (user.isVerified == false) return res.status(401).send({ error: 'Please Verify your Email before loging in.' });

                req.token = token;
                req.user = user;
                next();
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(401).send({ error: 'You are not authorized to make this request' });
    }
}

module.exports = authenticate;