const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/add', cartController.addItemToCart);
router.get('/:userId', cartController.getCartItems);

module.exports = router;
