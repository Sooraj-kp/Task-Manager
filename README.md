# Task Manager App

A simple full-stack Task Manager application built using React, Node.js, Express.js, and MongoDB.

Users can register, log in, and manage their own tasks.

## Features

### Authentication

- User registration
- User login
- Password encryption using bcryptjs
- JWT authentication
- Logout
- Protected routes

### Task Management

- Add new tasks
- View tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Set task priority:
  - Low
  - Medium
  - High

### Dashboard

- View all tasks
- Search tasks by title
- Filter tasks by:
  - All
  - Pending
  - Completed
- View completed task percentage
- Dark/light mode
- Responsive design

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
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
Task-Manager/
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
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

Make sure you have:

- Node.js
- MongoDB or MongoDB Atlas

### 1. Clone the Repository

```bash
git clone https://github.com/Sooraj-kp/Task-Manager.git
cd Task-Manager
```

### 2. Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## How to Use

1. Register a new account.
2. Log in using your email and password.
3. Create a new task.
4. View your tasks on the dashboard.
5. Edit or delete tasks.
6. Mark tasks as completed.
7. Search and filter tasks.
8. Log out when finished.

## Environment Variables

The backend requires:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not upload the `.env` file to GitHub.

## Demo

The application is not currently deployed.

It can be run locally by following the setup instructions above.

## Author

**SOORAJ K P**
