const express = require('express');
const { createUser } = require('../controllers/shipping.controller');
const authenticateToken = require('../middleware/auth.midddleware'); 
const router = express.Router();

router.post('/create', authenticateToken,createUser);

module.exports = router;
