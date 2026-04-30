import TeamService from "../services/team.service.js";

class TeamController {
  async createTeam(req, res, next) {
    try {
      const userId = req.user?.id;
      const team = await TeamService.createTeam(userId, req.body);
      res.status(201).json({ success: true, data: team });
    } catch (error) {
      next(error);
    }
  }

  async getMyTeams(req, res, next) {
    try {
      const userId = req.user?.id;
      const teams = await TeamService.getMyTeams(userId);
      res.status(200).json({ success: true, data: teams });
    } catch (error) {
      next(error);
    }
  }

  async getTeamById(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const team = await TeamService.getTeamById(teamId, userId);
      res.status(200).json({ success: true, data: team });
    } catch (error) {
      next(error);
    }
  }

  async updateTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const updatedTeam = await TeamService.updateTeam(teamId, userId, req.body);
      res.status(200).json({ success: true, data: updatedTeam });
    } catch (error) {
      next(error);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      await TeamService.deleteTeam(teamId, userId);
      res.status(200).json({ success: true, message: "Team deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async inviteMember(req, res, next) {
    try {
      const { teamId } = req.params;
      const { email } = req.body;
      const userId = req.user?.id;
      const membership = await TeamService.inviteMember(teamId, userId, email);
      res.status(201).json({ success: true, data: membership });
    } catch (error) {
      next(error);
    }
  }

  async removeMember(req, res, next) {
    try {
      const { teamId, userId: targetUserId } = req.params;
      const userId = req.user?.id;
      await TeamService.removeMember(teamId, userId, targetUserId);
      res.status(200).json({ success: true, message: "Member removed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async changeMemberRole(req, res, next) {
    try {
      const { teamId, userId: targetUserId } = req.params;
      const { role } = req.body;
      const userId = req.user?.id;
      const membership = await TeamService.changeMemberRole(teamId, userId, targetUserId, role);
      res.status(200).json({ success: true, data: membership });
    } catch (error) {
      next(error);
    }
  }

  async listMembers(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const members = await TeamService.listMembers(teamId, userId);
      res.status(200).json({ success: true, data: members });
    } catch (error) {
      next(error);
    }
  }
}

export default new TeamController();
