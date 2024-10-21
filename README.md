# ShopNexus Backend APIs

**ShopNexus** is a backend service for an e-commerce platform that provides essential APIs for managing users, products, reviews, shopping carts, coupon codes, and notifications via email.

## Features


## User API

1. **Sign Up**: Allows users to register an account by providing their name, email, and password.
2. **Sign In**: Authenticates users and returns a token for secure access.

## Product API

1. **Add a new product with image uploads**: Create a new product with details like name, description, price, and images.
2. **Retrieve all products**: Get a list of all available products.
3. **Retrieve a single product by its ID**: Fetch details of a specific product using its unique ID.
4. **Add a variant to an existing product with image uploads**: Attach variants (e.g., size, color) to an existing product along with variant-specific images.
5. **Retrieve all variants of a product by its name**: Get all available variants of a product based on the product name.
6. **Apply a discount to a product**: Add or update a discount percentage for a specific product.
7. **Edit a product with image uploads**: Modify product details including its images.
8. **Soft delete (remove) a product**: Temporarily remove a product from the catalog without permanently deleting it.
9. **Restore a removed product**: Recover a soft-deleted product and make it available again.
10. **Permanently delete a product**: Completely remove a product from the system.
11. **Retrieve all removed (soft-deleted) products**: Get a list of all products that have been soft-deleted.
12. **Update the display status of a product on the homepage**: Change whether or not a product is displayed on the homepage.
13. **Retrieve images of a product by its name**: Fetch all images associated with a product using its name.

## Review API

1. **Add a review for a product**: Submit a product review including a rating, description, and images (optional).
2. **Retrieve product reviews**: Get all reviews associated with a specific product.
3. **Get a specific product review**: Fetch details of a particular review using its unique ID.
4. **Delete a review**: Remove a specific product review.

## Cart API

1. **Add item to cart**: Add a product (including its variant) to a user's shopping cart.
2. **Retrieve cart items**: Get a list of items currently in a user's cart.

## Coupon Code API

1. **Create new coupon codes**: Generate a new coupon with a code, discount percentage, and expiry date.
2. **Retrieve all coupon codes or a specific coupon by code**: Get a list of all available coupons or fetch details of a specific coupon using its code.
3. **Get a specific coupon by code**: Fetch details of a coupon using its unique code.
4. **Update existing coupon codes**: Modify coupon details such as expiration date or mark it as invalid.
5. **Delete coupon codes**: Permanently remove a coupon from the system.

## Contact API

1. **Send notifications via email**: Send email notifications to users regarding orders, updates, etc.

## Shipping API

1. **Create customer shipping details**: Collect and store shipping information for customers during checkout.
