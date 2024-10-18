const express = require('express');
const productController = require('../controllers/product.controller');
const authenticateToken = require('../middleware/auth.midddleware'); 
const multer = require('multer');
const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.array('images', 4), productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.post('/:mainProductName/variant', upload.array('images', 4), productController.addVariant);
router.get('/:productName/variants', productController.getProductVariants);
router.patch('/:productId/discount', productController.applyDiscount);
router.put('/:productId/edit', upload.array('images', 4), productController.editProduct);
router.delete('/:productId/remove', productController.removeProduct);
router.put('/:productId/restore', productController.restoreProduct);
router.delete('/:productId/delete', productController.deleteProduct);
router.get('/removed', productController.getRemovedProducts);
router.get('/:productName/images', productController.getProductImages);
router.patch('/:productId/display', productController.updateDisplayStatus);
router.post('/:productId/toggle-like', authenticateToken, productController.toggleLikeProduct); // Like a product

module.exports = router;
