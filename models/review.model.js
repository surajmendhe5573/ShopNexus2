const mongoose= require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewDescription: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  displayOnProductPage: {
    type: Boolean,
    default: false  // By default, the review won't be displayed until the admin approves it
  }
}, 
{ timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
