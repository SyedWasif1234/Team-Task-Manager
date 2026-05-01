# Team Task Manager Backend

Welcome to the **Team Task Manager Backend**! This server handles everything needed to manage teams, projects, and tasks for your application.

## 🚀 What does this do?

This backend provides all the necessary APIs (the hidden brain of the app) for a Team Task Manager. It is built using **Node.js, Express, and Prisma** (with a PostgreSQL database).

Here is a simple breakdown of what it handles:
- **Authentication**: Users can sign up, log in, and securely access the app.
- **Teams**: You can create a team, invite other users by their email, and assign them roles like `OWNER`, `ADMIN`, or `MEMBER`.
- **Projects**: Inside a team, you can create multiple projects to organize your work.
- **Tasks**: Inside a project, you can create tasks, assign them to team members, set a priority (Low, Medium, High, Critical), and track their status (To Do, In Progress, Review, Done).
- **Dashboard**: Get a quick summary of how many tasks are done, pending, or overdue.

## 📁 Backend Folder Structure & Architecture

The backend follows a layered architecture to keep code organized and maintainable:
- **`controllers/`**: Handles incoming API calls, validates requests, and sends responses.
- **`services/`**: Contains the main business logic. Controllers pass data here for processing.
- **`repositories/`**: Handles all direct database queries and interactions (Data Access Layer).
- **`routers/`**: Defines the API endpoints and maps them to their respective controllers.
- **`middlewares/`**: Functions that run before requests reach the controller (e.g., authentication checks, error handling).
- **`dtos/`**: Data Transfer Objects used to structure, validate, and format request/response data.
- **`exceptions/`**: Custom error classes for consistent error handling across the application.
- **`lib/`**: Shared utilities, configurations, and external integrations.

---

## 🛠️ How to start the server

1. Open your terminal in the `Backend` folder.
2. Install the dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *(This will use `nodemon` so the server automatically restarts when you make changes).*

4. The server will start on `http://localhost:8000`.

---

## 📚 Simple API Guide

Here are the main endpoints you can use (you can test these in Postman):

### 1. Auth
- **POST** `/api/v1/auth/register` - Create a new account
- **POST** `/api/v1/auth/login` - Log into your account
- **GET** `/api/v1/auth/check-Auth` - Check who is currently logged in

### 2. Teams
- **POST** `/api/v1/teams` - Create a new team
- **GET** `/api/v1/teams` - View all teams you are a part of
- **POST** `/api/v1/teams/:teamId/members` - Invite a user to your team (requires their email)

### 3. Projects
- **POST** `/api/v1/teams/:teamId/projects` - Create a new project inside a team
- **GET** `/api/v1/teams/:teamId/projects` - View all projects in a team

### 4. Tasks
- **POST** `/api/v1/projects/:projectId/tasks` - Create a new task
- **PATCH** `/api/v1/tasks/:taskId/status` - Change task status (e.g., from TODO to DONE)
- **PATCH** `/api/v1/tasks/:taskId/assign` - Assign a task to a specific team member

---

## 🗄️ Database

This app uses **Neon PostgreSQL**.
To update your database if you make any changes to `prisma/schema.prisma` in the future, run:
```bash
npx prisma migrate dev --name "describe_your_change_here"
```



# Team Task Manager Frontend

Welcome to the **Team Task Manager Frontend**! This is the user interface of the application, built with React and Vite.

## 📁 Frontend Folder Structure & Architecture

The frontend code is structured to maximize component reusability and separation of concerns:
- **`components/`**: Reusable UI elements and layout sections (e.g., buttons, forms, navigation bars, modals).
- **`pages/`**: The main view components that represent different screens/routes in the app (e.g., Dashboard, Login, Project View).
- **`api/`**: Contains the functions and Axios instances used to make HTTP requests to the backend APIs.
- **`stores/`**: Global state management (e.g., Zustand) for handling user sessions, tasks, and shared UI state.
- **`utils/`**: Helper functions, formatters, and shared utility logic used across different components.
- **`assets/`**: Static files such as images, icons, and global CSS stylesheets.




Enjoy managing your tasks! 🚀