// route.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Define routes
router.post('/initiate-payment', paymentController.initiatePayment);
router.post('/capture-payment/:orderId', paymentController.capturePayment);
router.get('/verify-payment/:orderId', paymentController.verifyPayment);
router.get('/success', paymentController.successPayment);
router.get('/cancel', paymentController.cancelPayment);

module.exports = router;
