const mongoose = require('mongoose');

// Define a Mongoose schema for storing payment details with a reference to Order
const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String, // Change to String to accommodate PayPal's string order ID
    ref: 'Order', // Reference to the Order model
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded', 'COMPLETED'], // Added 'COMPLETED' in uppercase
    default: 'Pending'
  },
  amount: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  payer: {
    firstName: String,
    lastName: String,
    email: String,
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create the Mongoose model
const Payment = mongoose.model('Payment', paymentSchema);

// Function to save payment data
const savePaymentData = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};

module.exports = { savePaymentData };
