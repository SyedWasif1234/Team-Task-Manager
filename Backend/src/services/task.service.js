// TASK SERVICE — BUSINESS LOGIC

import TaskRepositorie from '../repositories/task.repositorie.js';
import ProjectRepositorie from '../repositories/project.repositorie.js';
import TeamRepositorie from '../repositories/team.repositorie.js';
import { TaskException } from '../exceptions/task.exception.js';
import { ProjectException } from '../exceptions/project.exception.js';
import { TeamException } from '../exceptions/team.exception.js';

class TaskService {

  /** Helper — fetch project and verify the user is a team member. Returns { project, membership } */
  async _getProjectAndVerifyMember(projectId, userId) {
    const project = await ProjectRepositorie.findById(projectId);
    if (!project) throw ProjectException.notFound();

    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TeamException.accessDenied();

    return { project, membership };
  }

  async createTask(projectId, userId, data) {
    await this._getProjectAndVerifyMember(projectId, userId);

    // If assigneeId provided, verify the assignee is also a team member
    if (data.assigneeId) {
      const project = await ProjectRepositorie.findById(projectId);
      const assigneeMembership = await TeamRepositorie.findMembership(data.assigneeId, project.teamId);
      if (!assigneeMembership) throw TaskException.assigneeNotMember();
    }

    return await TaskRepositorie.create({ ...data, projectId, createdBy: userId });
  }

  async getTasksByProject(projectId, userId, filters = {}) {
    await this._getProjectAndVerifyMember(projectId, userId);
    return await TaskRepositorie.findAllByProject(projectId, filters);
  }

  async getTaskById(taskId, userId) {
    const task = await TaskRepositorie.findById(taskId);
    if (!task) throw TaskException.notFound();

    // Verify user belongs to the task's team
    const project = await ProjectRepositorie.findById(task.projectId);
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TaskException.accessDenied();

    return task;
  }

  async updateTask(taskId, userId, data) {
    const task = await TaskRepositorie.findById(taskId);
    if (!task) throw TaskException.notFound();

    const project = await ProjectRepositorie.findById(task.projectId);
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TaskException.accessDenied();

    // Only owner, task creator, or assignee can edit
    const canEdit =
      membership.role === 'OWNER' ||
      task.createdBy === userId ||
      task.assigneeId === userId;
    if (!canEdit) throw TaskException.accessDenied();

    // Validate new assignee is a team member if changing
    if (data.assigneeId && data.assigneeId !== task.assigneeId) {
      const assigneeMembership = await TeamRepositorie.findMembership(data.assigneeId, project.teamId);
      if (!assigneeMembership) throw TaskException.assigneeNotMember();
    }

    return await TaskRepositorie.update(taskId, data);
  }

  async deleteTask(taskId, userId) {
    const task = await TaskRepositorie.findById(taskId);
    if (!task) throw TaskException.notFound();

    const project = await ProjectRepositorie.findById(task.projectId);
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TaskException.accessDenied();

    if (membership.role !== 'OWNER' && task.createdBy !== userId) {
      throw TaskException.accessDenied();
    }

    return await TaskRepositorie.delete(taskId);
  }

  async changeStatus(taskId, userId, status) {
    const task = await TaskRepositorie.findById(taskId);
    if (!task) throw TaskException.notFound();

    const project = await ProjectRepositorie.findById(task.projectId);
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TaskException.accessDenied();

    return await TaskRepositorie.update(taskId, { status });
  }

  async assignTask(taskId, userId, assigneeId) {
    const task = await TaskRepositorie.findById(taskId);
    if (!task) throw TaskException.notFound();

    const project = await ProjectRepositorie.findById(task.projectId);
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw TaskException.accessDenied();

    // Verify assignee is a team member (allow null to unassign)
    if (assigneeId) {
      const assigneeMembership = await TeamRepositorie.findMembership(assigneeId, project.teamId);
      if (!assigneeMembership) throw TaskException.assigneeNotMember();
    }

    return await TaskRepositorie.update(taskId, { assigneeId: assigneeId || null });
  }
}

export default new TaskService();
