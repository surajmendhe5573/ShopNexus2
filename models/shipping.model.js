const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address_line_1: { type: String, required: true },
  address_line_2: { type: String },
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } // Reference to the User model
});

const User = mongoose.model('shipping', shippingSchema);

module.exports = User;
