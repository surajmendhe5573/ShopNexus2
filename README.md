# ShopNexus Backend AP

**ShopNexus** is a backend service for an e-commerce platform that provides essential APIs for managing users, products, reviews, shopping carts, coupon codes, and notifications via email.

## Features

## User API

1. **Sign Up**
2. **Sign In**

## Product API

1. **Add a new product with image uploads**
2. **Retrieve all products**
3. **Retrieve a single product by its ID**
4. **Add a variant to an existing product with image uploads**
5. **Retrieve all variants of a product by its name**
6. **Apply a discount to a product**
7. **Edit a product with image uploads**
8. **Soft delete (remove) a product**
9. **Restore a removed product**
10. **Permanently delete a product**
11. **Retrieve all removed (soft-deleted) products**
12. **Update the display status of a product on the homepage**
13. **Retrieve images of a product by its name**

## Review API

1. **Add a review for a product**
2. **Retrieve product reviews**
3. **Get a specific product review**
4. **Delete a review**

## Cart API

1. **Add item to cart**
2. **Retrieve cart items**

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

```
## 🚀 About Me
I'm a Backend developer...

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/surajmendhe5573)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/suraj-mendhe-569879233/?original_referer=https%3A%2F%2Fsearch%2Eyahoo%2Ecom%2F&originalSubdomain=in)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
