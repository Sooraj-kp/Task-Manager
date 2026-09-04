# Task Manager

A full-stack Task Manager application built using React, Node.js, Express.js, and MongoDB. The application provides user authentication using JWT and allows authenticated users to create, view, update, and delete their own tasks.

## Features

### Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected task routes
- Logout functionality

### Task Management
- Create tasks
- View all tasks belonging to the logged-in user
- Update task title and description
- Update task status
- Delete tasks
- Task status:
  - Pending
  - Completed
- Task priority:
  - Low
  - Medium
  - High

### Dashboard
- Display user's tasks
- Search tasks
- Filter tasks by status
- Display task progress
- User-specific task management
- Dark mode support
- Responsive user interface

## Technologies Used

### Frontend
- React
- Vite
- React Router DOM
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- CORS
- dotenv

## Project Structure

```text
Task-Manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
└── README.md