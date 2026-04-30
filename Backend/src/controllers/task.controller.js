import TaskService from "../services/task.service.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      const task = await TaskService.createTask(projectId, userId, req.body);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  async getTasksByProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;
      // Allow filtering by status, priority, assigneeId
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        assigneeId: req.query.assigneeId
      };
      const tasks = await TaskService.getTasksByProject(projectId, userId, filters);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;
      const task = await TaskService.getTaskById(taskId, userId);
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;
      const updatedTask = await TaskService.updateTask(taskId, userId, req.body);
      res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;
      await TaskService.deleteTask(taskId, userId);
      res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;
      const { status } = req.body;
      const task = await TaskService.changeStatus(taskId, userId, status);
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  async assignTask(req, res, next) {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;
      const { assigneeId } = req.body;
      const task = await TaskService.assignTask(taskId, userId, assigneeId);
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
