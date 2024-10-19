const mongoose = require('mongoose');

// Cart Item schema
const cartItemSchema = new mongoose.Schema({
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
});

// Cart schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);


// const mongoose = require('mongoose');

// // Cart Item schema
// const cartItemSchema = new mongoose.Schema({
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
//   },
//   productDetails: { // Add productDetails field
//     productName: { type: String },
//     productCategory: { type: String },
//     smallDescription: { type: String },
//     detailedDescription: { type: String },
//     productPrice: { type: Number }, // Optionally store here if needed
//     images: [{ type: String }] // You can also store the images directly
//   }
// });

// // Cart schema
// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [cartItemSchema],
// }, { timestamps: true });

// module.exports = mongoose.model('Cart', cartSchema);
