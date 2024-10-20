const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactMails.controller');

// Route to handle contact form submission
router.post('/sendMail', contactController.submitContactForm);

module.exports = router;
