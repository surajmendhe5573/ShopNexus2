const express= require('express');
const router= express.Router();
const couponController= require('../controllers/coupon.controller');

router.post('/create', couponController.create);
router.get('/fetch', couponController.fetchAllCoupons);
router.get('/:code', couponController.getCoupon);
router.put('/:code', couponController.updateCoupon);
router.delete('/:code', couponController.deleteCoupon);

module.exports= router;