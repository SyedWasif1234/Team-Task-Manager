import DashboardService from "../services/dashboard.service.js";

class DashboardController {
  async getMyDashboard(req, res, next) {
    try {
      const userId = req.user?.id;
      const dashboard = await DashboardService.getMyDashboard(userId);
      res.status(200).json({ success: true, data: dashboard });
    } catch (error) {
      next(error);
    }
  }

  async getTeamDashboard(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const dashboard = await DashboardService.getTeamDashboard(teamId, userId);
      res.status(200).json({ success: true, data: dashboard });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();
