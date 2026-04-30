import express from "express";
import ProjectController from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Team-level project routes (creation & listing by team)
router.post("/teams/:teamId/projects", ProjectController.createProject);
router.get("/teams/:teamId/projects", ProjectController.getProjectsByTeam);

// Project-level routes
router.get("/:projectId", ProjectController.getProjectById);
router.put("/:projectId", ProjectController.updateProject);
router.delete("/:projectId", ProjectController.deleteProject);

export default router;
