const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { userId, productId, variantId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch variant details if variantId is provided
    let variantDetails = null;
    if (variantId) {
      const variant = product.variants.id(variantId); // Find the variant by ID

      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }

      // Include variant details in the cart
      variantDetails = {
        variantName: variant.variantName,
        productSize: variant.productSize,
        productWoodType: variant.productWoodType,
        finishType: variant.finishType,
        productPrice: variant.productPrice,
        images: variant.images
      };
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item is already in the cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      (item.variantId ? item.variantId.toString() === variantId : !variantId)
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart with variant details
      cart.items.push({ productId, variantId, quantity, variantDetails });
    }
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};


// Retrieve cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      model: 'Product',
      populate: {
        path: 'variants',
        model: 'Product', 
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// exports.addItemToCart = async (req, res) => {
//   try {
//     const { userId, productId, variantId, quantity } = req.body;

//     if (!userId || !productId || !quantity) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Fetch variant details if variantId is provided
//     let variantDetails = null;
//     if (variantId) {
//       const variant = product.variants.id(variantId); // Find the variant by ID

//       if (!variant) {
//         return res.status(404).json({ message: 'Variant not found' });
//       }

//       // Include variant details in the cart
//       variantDetails = {
//         variantName: variant.variantName,
//         productSize: variant.productSize,
//         productWoodType: variant.productWoodType,
//         finishType: variant.finishType,
//         productPrice: variant.productPrice,
//         images: variant.images
//       };
//     }

//     // Find or create the cart for the user
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     // Check if item is already in the cart
//     const existingItemIndex = cart.items.findIndex(item => 
//       item.productId.toString() === productId && 
//       (item.variantId ? item.variantId.toString() === variantId : !variantId)
//     );

//     if (existingItemIndex > -1) {
//       // Update quantity if item already exists
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       // Add new item to the cart with variant and product details
//       cart.items.push({
//         productId,
//         variantId,
//         quantity,
//         variantDetails,
//         productDetails: { // Add the product details
//           productName: product.productName,
//           productCategory: product.productCategory,
//           smallDescription: product.smallDescription,
//           detailedDescription: product.detailedDescription,
//           productPrice: product.productPrice,
//           images: product.images
//         }
//       });
//     }
//     await cart.save();

//     res.status(200).json({ message: 'Item added to cart', cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server error' });
//   }
// };