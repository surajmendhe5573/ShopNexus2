const Wishlist = require('../models/wishlist.model');

// Add item to wishlist
const addItemToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  
  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist if the user doesn't have one
      wishlist = new Wishlist({ userId, productIds: [productId] });
    } else {
      // Add product to the wishlist if it's not already included
      if (!wishlist.productIds.includes(productId)) {
        wishlist.productIds.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

// Retrieve wishlist items for a user
const retrieveWishlist= async (req, res) => {
    const { userId } = req.params;
  
    try {
      const wishlist = await Wishlist.findOne({ userId }).populate('productIds');
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving wishlist', error });
    }
  };
  
  // Remove item from wishlist
const removeWishlist= async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      // Remove the product ID if it exists in the wishlist
      wishlist.productIds = wishlist.productIds.filter(id => id.toString() !== productId);
      await wishlist.save();
  
      res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
      res.status(500).json({ message: 'Error removing product from wishlist', error });
    }
  };
  

module.exports= {addItemToWishlist, retrieveWishlist, removeWishlist};