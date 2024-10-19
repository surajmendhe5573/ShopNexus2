const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isValid: { type: Boolean, default: true },
  expiryDate: { type: Date, required: true },
  discountAmount: { type: Number, required: true }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
