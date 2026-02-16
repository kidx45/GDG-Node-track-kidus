## Mini Project: E-Commerce Backend API

This mini project is part of the **GDG Node.js Track** and focuses on building a **simple E-Commerce backend API** using **Node.js**, **Express**, and **MongoDB Atlas**.

The goal is to apply all concepts learned up to **Week 5**, including REST principles, CRUD operations, database integration, validation, and proper project structure.

### Project Overview

---

Build a backend API that allows users to:

- View available products
- Add products to a cart
- Place orders based on cart contents

All data is stored and managed using **MongoDB Atlas**.  
Testing is performed using **Postman**.

### Learning Objectives

---

This project focuses on understanding:

- RESTful API design and CRUD operations
- Express.js with MongoDB Atlas integration
- Using Mongoose models for data management
- Input validation and error handling
- Cart and order business logic
- Proper folder structure (MVC or similar)
- API testing and documentation using Postman

### Resources

---

The API manages the following resources:

- **Products** — items available for sale  
  (`name`, `description`, `price`, `stock`, `category`, `imageUrl`)

- **Cart** — cart items stored in the database  
  (`productId`, `quantity`)

- **Orders** — orders created from the cart  
  (`items`, `total`, `customer info`, `date`)

### API Endpoints

---

#### Products

---

**`GET /products`**

- List all products
- Supports filters:
  - `?category=`
  - `?minPrice=`
  - `?maxPrice=`

**`GET /products/:id`**

- Get product details

**`POST /products`**

- Create a new product

**`PUT /products/:id`**

- Update product details

**`DELETE /products/:id`**

- Delete a product

#### Cart

---

**`GET /cart`**

- View current cart

**`POST /cart`**

- Add item to cart

**`PUT /cart`**

- Update cart items

**`DELETE /cart/:productId`**

- Remove item from cart

#### Orders

---

**`POST /orders`**

- Create an order from cart
- Validates stock availability
- Returns order receipt

**`GET /orders`**

- List all orders

**`GET /orders/:id`**

- View order details

### Validation & Error Handling

---

- Product name is required
- Price must be a positive number
- Stock must be non-negative

Cart operations validate:

- Product existence
- Stock availability

Uses appropriate HTTP status codes:

- **201 Created**
- **400 Bad Request**
- **404 Not Found**

Meaningful error messages are returned for invalid requests.

### Technologies Used

---

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript (ES6 Modules)
- Postman (API Testing)
