# Full-Stack Task Manager

A scalable, secure full-stack application built for the Backend Developer (Intern) Assignment. This project features a robust RESTful API with JWT authentication, role-based access control, and a React frontend for interacting with the backend services.

---

## 🚀 Features

- **Secure Authentication:** User registration and login utilizing hashed passwords (`bcryptjs`) and JSON Web Tokens (JWT).
- **Role-Based Access Control (RBAC):** Middleware restrictions differentiating standard users from admin users.
- **Complete CRUD Operations:** Full create, read, update, and delete capabilities for the Task entity.
- **API Versioning:** Clean and maintainable routing structure (`/api/v1/`).
- **Modern Frontend:** Protected routes and global state management connecting seamlessly to the REST API.
- **Comprehensive Documentation:** Included Postman collection with saved request/response examples.

---

## 💻 Tech Stack

| Category | Technologies |
|----------|---------------|
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, Zustand, React Router DOM |

---

## 🛠️ Setup & Installation

### 1. Database Setup

Ensure you have a MongoDB instance running locally or via MongoDB Atlas. Obtain your connection string.

### 2. Backend Initialization

Navigate to the backend directory, install dependencies, configure the environment, and start the server.

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend Initialization

Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

---

## 📚 API Reference

**Base URL:** `http://localhost:5000`

> **Note:** Protected routes require a valid JWT in the `Authorization: Bearer <token>` header.

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | User registration |
| POST | `/api/v1/auth/login` | User login |

### Tasks Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Retrieve all tasks |
| POST | `/api/v1/tasks` | Create a new task |
| PUT | `/api/v1/tasks/:id` | Update an existing task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |

### Admin Endpoints (Protected & Role-Restricted)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | Retrieve all users |

---

## 📖 Postman Documentation

A complete Postman collection is included in the root directory as `postman_collection.json`.

**Steps to import:**

1. Open Postman
2. Click **Import** and select the `postman_collection.json` file
3. The collection includes saved response examples validating the RBAC and CRUD functionality

---

## 📈 Scalability & Deployment Readiness

To transition this application from a development environment to a high-traffic production system handling thousands of concurrent users, the following architectural enhancements would be implemented:

### 1. Caching Layer (Redis)

Integrating Redis would significantly reduce database load and improve response latency. Frequently accessed, read-heavy data—such as a user's task list—would be cached. The cache would be invalidated or updated during PUT, POST, or DELETE operations on the respective entities.

### 2. Horizontal Scaling & Load Balancing

The current monolithic Node.js process is single-threaded. To scale, the backend would be containerized using Docker. An orchestration tool like Kubernetes (or AWS ECS) would manage multiple instances of the backend containers. An Application Load Balancer (e.g., NGINX, AWS ALB) would sit in front of these instances, distributing incoming traffic evenly using algorithms like round-robin or least connections.

### 3. Database Optimization & Sharding

As the Tasks collection grows exponentially, strict indexing strategies on heavily queried fields (user_id, status) are required to maintain fast lookup times. For massive data scale, the MongoDB database would utilize horizontal sharding. Sharding the collections based on a hashed user_id ensures that data distribution is even across multiple database clusters, preventing any single node from becoming a bottleneck.

### 4. Microservices Evolution

If the application scope expands to include new domains, the architecture would transition to microservices. The Authentication domain would be decoupled from the Task Management domain into separate, independently deployable services. These services would communicate asynchronously via an event bus or message broker (like RabbitMQ or Apache Kafka), ensuring high availability and fault isolation.