const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/add', wishlistController.addItemToWishlist);
router.get('/retrieve/:userId', wishlistController.retrieveWishlist);
router.delete('/remove', wishlistController.removeWishlist);

module.exports = router;

