const Review = require('../models/review.model');
const Product = require('../models/product.model');
const authMessages = require('../helper/commonMessages');
const config = require('../config/keys');
const jwt = require('jsonwebtoken');

// Add reviews
exports.addReview = async (req, res) => {
    try {
      // Check if the token exists in the request headers (indicating the user is logged in)
      const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
      
      if (!token) {
        return res.status(401).json({ message: "You need to log in to add a review" });
      }
  
      // Verify and decode the token to extract user info (e.g., username)
      const decoded = jwt.verify(token, config.jwtAuthSecret); 
      // const username = decoded.username;
  
      const { productName } = req.params;
      const { stars, reviewDescription, username } = req.body;
  
      const product = await Product.findOne({ productName });
  
      if (!product) {
        return res.status(404).json({ message: authMessages.auth.productNotFound });
      }
  
      // Extract the individual image files from req.files
      const images = [
        req.files.img1 ? req.files.img1[0].path : null,
        req.files.img2 ? req.files.img2[0].path : null,
        req.files.img3 ? req.files.img3[0].path : null,
        req.files.img4 ? req.files.img4[0].path : null,
      ].filter(Boolean); 
  
      const review = new Review({
        product: product._id,
        stars,
        reviewDescription,
        images,
        username, 
      });
  
      await review.save();
  
      res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };
  
  
  // Get all reviews
  exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate('product', 'productName');
  
      if (!reviews.length) {
        return res.status(404).json({ message: authMessages.auth.productNotFound});
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };
  
  // Get reviews for a specific product by product name
  exports.getProductReviews = async (req, res) => {
    try {
      const { productName } = req.params;
  
      const product = await Product.findOne({ productName });
  
      if (!product) {
        return res.status(404).json({ message: authMessages.auth.productNotFound });
      }
  
      const reviews = await Review.find({ product: product._id }).populate('product', 'productName');
  
      if (!reviews.length) {
        return res.status(404).json({ message: 'No reviews found for this product' });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };
  
  // Delete a review by ID
  exports.deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      await Review.findByIdAndDelete(reviewId);
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };
  
  //  Update the display status of a review (displayOnProductPage)
  exports.updateReviewDisplayStatus = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { displayOnProductPage } = req.body; 
  
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      review.displayOnProductPage = displayOnProductPage; 
  
      await review.save();
  
      res.status(200).json({ message: 'Review display status updated', review });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };
  