// const mongoose = require('mongoose');

// // Order Item schema
// const orderItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   variantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Variant',
//     required: false
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1
//   },
//   variantDetails: {
//     variantName: { type: String },
//     productSize: { type: String },
//     productWoodType: { type: String },
//     finishType: { type: String },
//     productPrice: { type: Number },
//     images: [{ type: String }]
//   }
// }, { _id: false });

// // Order schema
// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [orderItemSchema],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed', 'Cancelled'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

// Order Item schema
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: false
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  variantDetails: {
    variantName: { type: String },
    productSize: { type: String },
    productWoodType: { type: String },
    finishType: { type: String },
    productPrice: { type: Number },
    images: [{ type: String }]
  }
}, { _id: false });

// Order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled', 'Shipped', 'Delivered'],
    default: 'Completed'
  },
  shippingStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Processing'
  },
  cancellationDate: {
    type: Date,
    required: false
  },
  trackingNumber: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
