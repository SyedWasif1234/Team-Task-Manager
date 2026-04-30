import ProjectService from "../services/project.service.js";

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const project = await ProjectService.createProject(teamId, userId, req.body);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async getProjectsByTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user?.id;
      const projects = await ProjectService.getProjectsByTeam(teamId, userId);
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      const project = await ProjectService.getProjectById(projectId, userId);
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      const updatedProject = await ProjectService.updateProject(projectId, userId, req.body);
      res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      await ProjectService.deleteProject(projectId, userId);
      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();