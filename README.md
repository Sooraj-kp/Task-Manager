# Task Manager App

A simple full-stack Task Manager application built using React, Node.js, Express.js, and MongoDB.

Users can register, log in, and manage their own tasks.

## Features

### Authentication

- User registration
- User login
- Password hashing using bcryptjs
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

Follow the steps below to run the application locally.

### Prerequisites

Install the following before setting up the project:

- Node.js 18 or later
- npm 9 or later
- MongoDB or a MongoDB Atlas account
- Git

You can check the installed versions using:

```bash
node --version
npm --version
git --version
```

> npm is installed automatically with Node.js.

### MongoDB Requirement

The application requires MongoDB to store users and tasks.

You can use either:

- A local MongoDB installation
- MongoDB Atlas (cloud database)

If using MongoDB Atlas, create a database and obtain the MongoDB connection string.

## 1. Clone the Repository

Open a terminal or command prompt and run:

```bash
git clone https://github.com/Sooraj-kp/Task-Manager.git
```

Navigate into the project directory:

```bash
cd Task-Manager
```

The project contains separate `frontend` and `backend` folders.

## 2. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install all backend dependencies:

```bash
npm install
```

This installs the dependencies listed in `backend/package.json`.

### Configure Environment Variables

Create a new file named `.env` inside the `backend` folder.

The file should be located at:

```text
Task-Manager/backend/.env
```

Add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use your own MongoDB connection string and JWT secret key.

For example, for a local MongoDB database:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
```

For MongoDB Atlas, replace `MONGO_URI` with your MongoDB Atlas connection string.

> The `.env` file is not included in the GitHub repository. Each user must create their own `.env` file with their own MongoDB connection string and JWT secret.

### Start the Backend

After creating the `.env` file, start the backend server:

```bash
npm start
```

The backend server will run on:

```text
http://localhost:5000
```

Keep this terminal running while using the application.

For development with automatic server restart, you can also use:

```bash
npm run dev
```

## 3. Frontend Setup

Open a **new terminal window**.

From the project root, navigate to the frontend folder:

```bash
cd Task-Manager/frontend
```

If your terminal is already inside the `backend` folder, first run:

```bash
cd ..
```

Then:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

This installs the dependencies listed in `frontend/package.json`.

### Start the Frontend

Run:

```bash
npm run dev
```

Vite will start the React development server.

The frontend will normally be available at:

```text
http://localhost:5173
```

Open the URL displayed by Vite in your browser.

## 4. Running the Complete Application

Both the frontend and backend must be running at the same time.

### Terminal 1 - Backend

```bash
cd Task-Manager/backend
npm install
npm start
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 - Frontend

```bash
cd Task-Manager/frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The frontend communicates with the backend using Axios.

The overall application flow is:

```text
React Frontend
      ↓
     Axios
      ↓
Express / Node.js Backend
      ↓
    Mongoose
      ↓
    MongoDB
```

## 5. How to Use

After starting both servers:

1. Open `http://localhost:5173` in your browser.
2. Register a new account.
3. Log in using the registered email and password.
4. After successful login, access the dashboard.
5. Create a new task.
6. View your tasks.
7. Edit task details.
8. Change the task status.
9. Mark tasks as completed.
10. Set task priority.
11. Search tasks by title.
12. Filter tasks by All, Pending, or Completed.
13. Check the completed task percentage.
14. Delete tasks when no longer needed.
15. Use the dark/light mode option if required.
16. Log out of the application.

## Environment Variables

The backend requires the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Variable Description

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend server runs |
| `MONGO_URI` | MongoDB database connection string |
| `JWT_SECRET` | Secret key used to generate and verify JWT tokens |

> Do not upload the `.env` file to GitHub. Use your own MongoDB connection string and JWT secret.

## Demo

The application is not currently deployed.

It can be run locally by following the setup instructions above.

## Author

**SOORAJ K P**
