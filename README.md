# GDG Node.js Track – Learning Tasks

🚀 A personal repository created as part of the **GDG Node.js Track**.  
This repo contains hands-on tasks focused on learning **core Node.js concepts** by building servers and APIs **without frameworks**.

Each task is organized clearly and may later be moved into **separate branches** as the learning progresses.

---

## 📂 Repository Structure

- `main` – Overview and completed tasks
- `task-1` – Basic HTTP server & Student REST API  
*(More tasks will be added in the future)*

---

## ✅ Task 1: Basic Node.js HTTP Server & REST API

This task focuses on understanding:
- Core Node.js HTTP module
- Request & response handling
- URL routing
- Working with JSON data
- Basic REST principles

---

### 🔹 Part 1: Basic HTTP Server

Create a Node.js server running on **port 3000** with the following routes:

- **GET /**  
  **Respond with the "Welcome to the Home Page"**  

- **GET /info**  
**Respond with the message "This is in information page"**  

- **POST /submit**  
**Respond with The exact same JSON data that was sent in the request body.**  

---

### 🔹 Part 2: Student REST API

Create another Node.js server running on **port 4000**.

#### Requirements:
- Use an **in-memory array** called `students`
- Each student object contains:
- `id`
- `name`

#### Implement the following routes:

- **GET /students**  
**Respond with:**  
A JSON array containing all students.

- **POST /students**  
**Respond with:**  
  The newly created student object (with a unique `id`).

- **PUT /students/:id**  
**Respond with:**  
  The updated student object if found  
  An error message if the student does not exist

- **DELETE /students/:id**  
**Respond with:**  
  A confirmation message if deleted  
  An error message if the student does not exist

---

## 🛠 Technologies Used

- Node.js
- JavaScript (Vanilla)
- Core HTTP module (no frameworks)

---

## ▶️ How to Run Task 1

```bash
node task1.js
```
or if nodemon is avaliable

```bash
nodemon task1.js
```
