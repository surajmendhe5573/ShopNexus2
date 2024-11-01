# ShopNexus Backend APIs

**ShopNexus** is a backend service for an e-commerce platform that provides essential APIs to manage users, products, reviews, shopping carts, coupon codes, and notifications via email. Built with scalability and extensibility in mind, ShopNexus offers a robust foundation for e-commerce operations.

### Table of Contents
1. [Features](#features)
2. [User API](#user-api)
3. [Product API](#product-api)
4. [Review API](#review-api)
5. [Cart API](#cart-api)
6. [Coupon Code API](#coupon-code-api)
7. [Contact API](#contact-api)
8. [Shipping API](#shipping-api)
9. [Wishlist API](#Wishlist-api)
10. [Order API](#Order-api)
11. [Payment API](#Payment-api)
12. [Installation and Setup](#installation-and-setup)
13. [Environment Variables](#environment-variables)
14. [About Me](#about-me)
15. [Links](#links)

## Features

## User API

1. **Sign Up:**  Allow users to create an account.
2. **Sign In:** Enable users to log in to their accounts.

## Product API

1. **Add a new product:** Allows for adding a new product along with images.
2. **Retrieve all products:**  Fetch a list of all available products.
3. **Retrieve a single product:** Get details of a product using its unique ID.
4. **Add a variant:** Add a new variant (e.g., size, price) to an existing product, including images.
5. **Retrieve all variants:** List all variants associated with a specific product name.
6. **Apply  discount:** Apply a discount percentage to a product's price.
7. **Edit a product:** Update product details, with the option to upload new images.
8. **Soft delete product:** Temporarily remove a product without permanent deletion.
9. **Restore removed product:** Restore a product that was previously soft-deleted.
10. **Permanently delete product:** Completely delete a product from the database.
11. **Retrieve all soft-deleted products:** Get a list of all products that have been soft-deleted.
12. **Display status on homepage:** Control whether a product is visible on the homepage.
13. **Retrieve images of a product:** Retrieve all images of a product by its namee.

## Review API

1. **Add a review for a product**
2. **Retrieve product reviews**
3. **Get a specific product review**
4. **Delete a review**

## Cart API

1. **Add item to cart**
2. **Retrieve cart items**
3. **Remove product from cart**

## Coupon Code API

1. **Create new coupon codes**
2. **Retrieve all coupon codes or a specific coupon by code**
3. **Get a specific coupon by code**
4. **Update existing coupon codes**
5. **Delete coupon codes**

## Contact API

1. **Send notifications via email**: Send email notifications to users regarding orders, updates, etc.

## Shipping API

1. **Create customer shipping details**

## Wishlist API
1. **Allows users to add products they are interested in purchasing later**
2. **Gets all items a user has saved in their wishlist**
3. **Lets users remove items from their wishlist**

## Order API
1. **Users can place an order for items in their cart**
2. **Users can view their order history**
3. **Allows users to cancel an order**
4. **Allows users to track the status of their order in real time (e.g., processed, shipped, delivered)**
 
## Payment API
1. **Handles the initiation of a payment transaction (can integrate with payment gateways like PayPal)**
2. **Creates a new PayPal order and returns an approval URL for the user to complete the payment**
3. **Captures the payment for a given order ID once the user has approved it on PayPal**
4. **Verifies the status of a PayPal payment to check if it has been completed**
5. **Handles the success response from PayPal, captures the payment, and displays a success message with transaction details**
6. **Handles the cancel response from PayPal, displaying a message indicating the payment was canceled.**

## Installation and Setup
- Clone the repository
```
git clone https://github.com/surajmendhe5573/ShopNexus2.git
```
- Install dependencies
```
cd <ShopNexus>
npm install
```
- Build and run the project
```
npm start
```

## Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```

MONGODB_URI=mongodb://localhost:27017/defaultdb
PORT=8000

# Node Environment
NODE_ENV=local

# JWT Secrets
JWT_AUTH_SECRET=your_jwt_auth_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Email credentials
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# PayPal credentials (Replace with actual credentials in a secure location)
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_ENVIRONMENT=sandbox

```

## 🚀 About Me
I'm a Backend developer...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/surajmendhe5573)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suraj-mendhe-569879233/?original_referer=https%3A%2F%2Fsearch%2Eyahoo%2Ecom%2F&originalSubdomain=in)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
