const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { 
  addReview, 
  getAllReviews, 
  getProductReviews, 
  deleteReview,
  updateReviewDisplayStatus 
} = require('../controllers/review.controller');
const router = express.Router();

const reviewUploadsDir = path.join(__dirname, '../uploads/reviews');
if (!fs.existsSync(reviewUploadsDir)) {
  fs.mkdirSync(reviewUploadsDir, { recursive: true });
}

const reviewStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadReviewImages = multer({
  storage: reviewStorage,
});


// Routes
router.post('/:productName', uploadReviewImages.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 },
]), addReview);

router.get('/', getAllReviews);
router.get('/:productName', getProductReviews);
router.delete('/:reviewId', deleteReview);
router.patch('/:reviewId/display', updateReviewDisplayStatus);

module.exports = router;
