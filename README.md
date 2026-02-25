# Task Management System

A full-stack task management application with user authentication and real-time CRUD operations. Built with Next.js, Express, MongoDB, and TypeScript.

## 🏗️ Architecture

The project follows a modern full-stack architecture:

- **Frontend**: [Next.js](https://nextjs.org/) (App Router) with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) for styling, and [Radix UI](https://www.radix-ui.com/) components.
- **Backend**: [Express](https://expressjs.com/) server with [TypeScript](https://www.typescriptlang.org/), [Mongoose](https://mongoosejs.com/) for MongoDB interaction, and JWT-based authentication using HTTP-only cookies.
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Database).

## 🚀 Features

- **Authentication**: Secure registration, login, and logout.
- **Task Management**: Create, read, update, and delete tasks.
- **Search & Filter**: Search tasks by title and filter by status (pending/completed).
- **Pagination**: Efficient loading of tasks using server-side pagination.
- **Responsive UI**: Fully responsive design for mobile and desktop.
- **Secure Auth**: JWT stored in HTTP-only cookies for enhanced security.

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- MongoDB account (Atlas or local)

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` folder and add:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:5001/
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📖 API Documentation

Base URL: `http://localhost:5001` (Default)

## Authentication Endpoints

### 1. Register User
Create a new user account.

- **URL**: `/api/create`
- **Method**: `POST`
- **Auth required**: No

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Login User
Authenticate and receive a session cookie.

- **URL**: `/api/login`
- **Method**: `POST`
- **Auth required**: No

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK)**:
```json
{
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 3. Logout User
Clear the authentication cookie.

- **URL**: `/api/logout`
- **Method**: `GET`
- **Auth required**: No

**Response (200 OK)**:
```json
{
  "message": "Logged out successfully"
}
```

---

## Task Endpoints

*All task endpoints require authentication via HTTP-only cookie.*

### 1. Create Task
Add a new task for the current user.

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Auth required**: Yes

**Request Body**:
```json
{
  "title": "Complete Documentation",
  "description": "Write README and API docs for the project."
}
```

**Response (201 Created)**:
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "user": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Complete Documentation",
  "description": "Write README and API docs for the project.",
  "status": "pending"
}
```

---

### 2. Get All Tasks
Fetch tasks for the current user with pagination and search.

- **URL**: `/api/tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **Query Parameters**:
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)
    - `status` (optional, "pending" | "completed")
    - `search` (optional, search by title)

**Example Query**: `/api/tasks?page=1&limit=5&status=pending&search=docs`

**Response (200 OK)**:
```json
{
  "items": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "user": "64f1a2b3c4d5e6f7a8b9c0d1",
      "title": "Complete Documentation",
      "description": "Write README and API docs for the project.",
      "status": "pending"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "pages": 1,
    "hasMore": false
  }
}
```

---

### 3. Update Task
Modify an existing task.

- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Auth required**: Yes

**Request Body**:
```json
{
  "status": "completed"
}
```

**Response (200 OK)**:
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "user": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Complete Documentation",
  "description": "Write README and API docs for the project.",
  "status": "completed"
}
```

---

### 4. Delete Task
Remove a task.

- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Auth required**: Yes

**Response (200 OK)**:
```json
{
  "message": "Task deleted"
}
```

