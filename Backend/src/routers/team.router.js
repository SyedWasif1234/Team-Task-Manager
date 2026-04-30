import express from "express";
import TeamController from "../controllers/team.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", TeamController.createTeam);
router.get("/", TeamController.getMyTeams);
router.get("/:teamId", TeamController.getTeamById);
router.put("/:teamId", TeamController.updateTeam);
router.delete("/:teamId", TeamController.deleteTeam);

router.post("/:teamId/members", TeamController.inviteMember);
router.get("/:teamId/members", TeamController.listMembers);
router.delete("/:teamId/members/:userId", TeamController.removeMember);
router.patch("/:teamId/members/:userId/role", TeamController.changeMemberRole);

export default router;
