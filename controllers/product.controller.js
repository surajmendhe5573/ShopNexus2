const Product = require('../models/product.model');
const fs = require('fs');
const path = require('path');
const authMessages = require('../helper/commonMessages');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productCode,
      smallDescription,
      detailedDescription,
      productSize,
      productWoodType,
      finishType,
      productPrice,
      productDiscount,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const product = new Product({
      productName,
      productCategory,
      productCode,
      smallDescription,
      detailedDescription,
      productSize,
      productWoodType,
      finishType,
      productPrice,
      productDiscount: productDiscount || 0, // Default if not provided
      images,
    });

    await product.save();
    const shareableLink = `http://example.com/products/${product._id}`;
    res.status(201).json({product, shareableLink});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Retrieve a single product by ID
exports.getSingleProduct= async (req, res) => {
    try {
      const productId = req.params.id;
      
      const product = await Product.findById(productId);
    
      if (!product) {
        return res.status(404).json({ message: authMessages.auth.productNotFound });
      }
      
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: 'Internal Server error', error });
    }
  };

// Add variant to an existing product
exports.addVariant = async (req, res) => {
  try {
    const { mainProductName } = req.params;
    const {
      variantName,
      productSize,
      productWoodType,
      finishType,
      productPrice,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const product = await Product.findOne({ productName: mainProductName });

    if (!product) {
      return res.status(404).json({message: authMessages.auth.productNotFound});
    }

    const variant = {
      variantName,
      productSize,
      productWoodType,
      finishType,
      productPrice,
      images,
    };

    product.variants.push(variant);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Show variants of a product
exports.getProductVariants = async (req, res) => {
  const { productName } = req.params;

  try {
    const mainProduct = await Product.findOne({ productName });
    if (!mainProduct) {
      return res.status(404).json({ message: authMessages.auth.productNotFound });
    }

    const variants = await Product.find({ mainProduct: mainProduct._id });

    res.json({
      mainProduct,
      variants,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Apply discount to a product
exports.applyDiscount = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productDiscount } = req.body; // Get discount from the request body

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Apply the new discount
    const discountPercentage = productDiscount;
    const discountedPrice = product.productPrice - (product.productPrice * discountPercentage) / 100;

    product.productDiscount = discountPercentage; // Update the discount in the product
    product.productPrice = discountedPrice; // Update the product's price

    await product.save();

    res.status(200).json({
      message: 'Discount applied successfully',
      product: {
        id: product._id,
        productName: product.productName,
        originalPrice: product.productPrice + (product.productPrice * discountPercentage) / 100,
        discountedPrice: product.productPrice,
        productDiscount: discountPercentage
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

  

// Edit a product
exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productCategory,
      productCode,
      smallDescription,
      detailedDescription,
      productSize,
      productWoodType,
      finishType,
      productPrice,
      productDiscount,
    } = req.body;

    const images = req.files.map((file) => file.path);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        productCategory,
        productCode,
        smallDescription,
        detailedDescription,
        productSize,
        productWoodType,
        finishType,
        productPrice,
        productDiscount,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: authMessages.auth.productNotFound });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Soft delete (remove) a product
exports.removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, { isRemoved: true }, { new: true });

    if (!product) {
      return res.status(404).json({ message: authMessages.auth.productNotFound});
    }

    res.status(200).json({ message: 'Product removed successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Restore a removed product
exports.restoreProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, { isRemoved: false }, { new: true });

    if (!product) {
      return res.status(404).json({ message: authMessages.auth.productNotFound});
    }

    res.status(200).json({ message: 'Product restored successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Permanently delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: authMessages.auth.productNotFound });
    }

    res.status(200).json({ message: 'Product permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Retrieve soft-deleted products
exports.getRemovedProducts = async (req, res) => {
  try {
    const removedProducts = await Product.find({ isRemoved: true });

    if (removedProducts.length === 0) {
      return res.status(404).json({ message: authMessages.auth.productNotFound });
    }

    res.status(200).json({ message: 'Removed products retrieved successfully', products: removedProducts });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Retrieve images by product name
exports.getProductImages = async (req, res) => {
  try {
    const { productName } = req.params;
    const product = await Product.findOne({ productName });

    if (!product) {
      return res.status(404).json({ message: authMessages.auth.productNotFound });
    }

    res.status(200).json({ images: product.images });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Update product display status
exports.updateDisplayStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { displayOnHomePage } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: authMessages.auth.productNotFound});
    }

    product.displayOnHomePage = displayOnHomePage;
    await product.save();

    res.status(200).json({ message: 'Product display status updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error', error });
  }
};

// Toggle like/unlike product
exports.toggleLikeProduct = async (req, res) => {
  if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = req.user.id; 
  console.log("User ID:", userId); 

  const productId = req.params.productId; // Get the product ID from the request parameters

  try {
      
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      console.log("Product likedBy array before toggle:", product.likedBy);

      // Check if the user has already liked the product
      const userIndex = product.likedBy.findIndex(id => id && id.equals(userId));

      if (userIndex === -1) {
          // User has not liked the product yet; add their ID to likedBy
          product.likedBy.push(userId);
          await product.save(); 

          return res.status(200).json({
              message: 'Product liked successfully',
              product,
          });
      } else {
          // User has already liked the product; remove their ID from likedBy
          product.likedBy.splice(userIndex, 1);
          await product.save(); 

          return res.status(200).json({
              message: 'Product unliked successfully',
              product,
          });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred', error });
  }
};
