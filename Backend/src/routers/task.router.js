import express from "express";
import TaskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Project-level task routes (creation & listing by project)
router.post("/projects/:projectId/tasks", TaskController.createTask);
router.get("/projects/:projectId/tasks", TaskController.getTasksByProject);

// Task-level routes
router.get("/tasks/:taskId", TaskController.getTaskById);
router.put("/tasks/:taskId", TaskController.updateTask);
router.delete("/tasks/:taskId", TaskController.deleteTask);
router.patch("/tasks/:taskId/status", TaskController.changeStatus);
router.patch("/tasks/:taskId/assign", TaskController.assignTask);

export default router;
