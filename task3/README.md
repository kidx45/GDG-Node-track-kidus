## Task 3: Express Architecture & Validation (Bookstore API)

This task is part of the **GDG Node.js Track** and focuses on building a **professionally structured Express application** using layered architecture and data validation with **Joi**.

The objective is to understand project structure, modular routing, middleware usage, and request validation.

---

### Task Description

Build a **Book Inventory REST API** using Express.js that demonstrates proper architecture, routing, middleware, and validation techniques.

---

### Learning Objectives

This task focuses on understanding:

- Professional Express project structure (MVC-style)
- Modular routing using `express.Router`
- Middleware usage (custom & third-party)
- Request validation using Joi
- CRUD operations with REST APIs
- Routing precedence in Express

---

### Middleware & Architecture

- Uses **morgan** as a third-party middleware
- Middleware is applied **globally** in `app.js`
- Routes are defined using `express.Router`
- All book-related routes are modularized in `bookRoutes.js`

---

### Data Validation (Joi)

Validation is applied when creating a new book using a Joi schema.

#### Validation Rules

- **title**
  - String
  - Minimum length: 5
  - Required

- **author**
  - String
  - Minimum length: 3
  - Required

- **price**
  - Number
  - Greater than or equal to 0
  - Required

Validation occurs **before business logic** in the controller.  
Invalid data returns a **400 Bad Request** with a Joi error message.

---

### API Endpoints

An in-memory array named `books` is used.

---

#### **`GET /books`**

- Returns all books

---

#### **`GET /books/search`**

- Returns: `"You are on the search page"`
- Defined **before** `/books/:id` to test routing precedence

---

#### **`GET /books/:id`**

- Returns the book with the matching ID
- Returns **404 Not Found** if the book does not exist

---

#### **`POST /books`**

- Applies Joi validation

**If valid:**

- Generates a unique ID
- Adds the book to the array
- Returns **201 Created**

**If invalid:**

- Returns Joi validation error
- Status code **400 Bad Request**

---

#### **`DELETE /books/:id`**

- Deletes the book with the matching ID
- Returns **200 OK** with a confirmation message
- Returns an error if the book does not exist

---

### Technologies Used

- Node.js
- Express.js
- JavaScript (ES6 Modules)
- Joi (Validation)
- Morgan (Logging)
