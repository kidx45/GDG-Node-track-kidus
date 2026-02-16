## Task 2: Express App with Multiple Routes (ES6)

This task is part of the **GDG Node.js Track** and focuses on building a basic **Express application** using **ES6 syntax**.  
The objective is to understand routing, route parameters, query parameters, and different response types in Express.

---

### Task Description

Create an Express application that implements multiple routes using the **GET** method.

---

### Learning Objectives

This task focuses on understanding:

- Express application setup
- ES6 module syntax
- Route handling using GET requests
- Route parameters and query parameters
- Sending HTML, plain text, and JSON responses

---

### Implemented Routes

**`GET /home`**

- Returns a **welcome HTML message**
- The message is styled with **green text color**

---

**`GET /about`**

- Returns a **plain text response**
- Mimics a basic “About” page description

---

**`GET /students/:studentId`**

- Accepts:
  - `studentId` as a **route parameter**
  - `department` as an optional **query parameter**

**Example Request:**

```text
/students/101?department=Engineering
```

**Response:**

```json
{
  "studentId": "101",
  "department": "Engineering"
}
```

---

### Technologies Used

- Node.js
- Express.js
- JavaScript (ES6 Modules)
