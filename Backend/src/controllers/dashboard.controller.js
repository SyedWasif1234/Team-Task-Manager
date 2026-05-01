import DashboardService from "../services/dashboard.service.js";
import { DashboardResponseDto } from "../dtos/responce/dashboard.responce.dto.js";

class DashboardController {
  async getMyDashboard(req, res, next) {
    try {
      const userId = req.user?.id;
      console.log("user Id from getMyDashboard :" , userId);
      const dashboard = await DashboardService.getMyDashboard(userId);

      console.log('[Dashboard] service returned:', JSON.stringify(dashboard));
      const response = DashboardResponseDto.toPersonalDashboard(dashboard);
      console.log('[Dashboard] sending response:', JSON.stringify(response));
      res.status(200).json(response);
    } catch (error) {
      console.error('[Dashboard] ERROR:', error.message);
      next(error);
    }
  }

  async getTeamDashboard(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const dashboard = await DashboardService.getTeamDashboard(teamId, userId);
      res.status(200).json(DashboardResponseDto.toTeamDashboard(dashboard));
    } catch (error) {
      next(error);
    }
  }
}


export default new DashboardController();
