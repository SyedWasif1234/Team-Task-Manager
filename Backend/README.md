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

Enjoy managing your tasks! 🚀
