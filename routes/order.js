const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
// const auth = require('../middleware/auth.midddleware'); 

router.post('/place-order', OrderController.placeOrder);
router.get('/order-history/:userId', OrderController.getOrderHistory);
router.put('/order-cancel/:orderId', OrderController.cancelOrder);
router.get('/order-track/:orderId', OrderController.trackOrder);

module.exports= router;