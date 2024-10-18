const mongoose = require('mongoose');

// variant schema
const variantSchema = new mongoose.Schema({
  variantName: {
     type: String,
     required: true 
    },
  productSize: {
     type: String, 
     required: true 
    },
  productWoodType: {
     type: String, 
     required: true 
    },
  finishType: {
     type: String, 
     required: true 
    },
  productPrice: { 
    type: Number, 
    required: true 
   },
  images: [{ type: String, required: true }],
});

// product schema
const productSchema = new mongoose.Schema({
  productName: { 
    type: String, 
    required: true 
  },
  productCategory: { 
    type: String, 
    required: true 
  },
  productCode: {
     type: String, 
     required: true 
  },
  smallDescription: { 
    type: String, 
    required: true 
  },
  detailedDescription: {
    type: String, 
    required: true 
  },
  productSize: { 
    type: String, 
    required: true 
  },
  productWoodType: { 
    type: String, 
    required: true 
  },
  finishType: { 
    type: String, 
    required: true 
  },
  productPrice: { 
    type: Number, 
    required: true 
  },
  productDiscount: {
    type: Number, // Representing percentage discount
    min: 0,
    max: 100,
    default: 0 // Default to no discount
  },
  images: [{ type: String, required: true }],
  variants: [variantSchema],
  isRemoved: { 
    type: Boolean, 
    default: false 
  },
  displayOnHomePage: { type: Boolean, default: false },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, 
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
