// TASK REPOSITORY — DB CALLS ONLY

import { db } from '../lib/db.js';

const ASSIGNEE_SELECT = {
  id: true,
  username: true,
  email: true,
  profilePicture: true,
};

export class TaskRepositorie {

  async create({ title, description, priority, dueDate, projectId, createdBy, assigneeId }) {
    return await db.task.create({
      data: { title, description, priority, dueDate, projectId, createdBy, assigneeId },
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
  }

  async findById(taskId) {
    return await db.task.findUnique({
      where: { id: taskId },
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
  }

  /**
   * List tasks for a project with optional filters.
   * @param {string} projectId
   * @param {{ status?, priority?, assigneeId? }} filters
   */
  async findAllByProject(projectId, filters = {}) {
    const where = { projectId };
    if (filters.status)     where.status     = filters.status;
    if (filters.priority)   where.priority   = filters.priority;
    if (filters.assigneeId) where.assigneeId = filters.assigneeId;

    return await db.task.findMany({
      where,
      include: { assignee: { select: ASSIGNEE_SELECT } },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  /** All tasks assigned to a specific user */
  async findAllByAssignee(assigneeId, filters = {}) {
    const where = { assigneeId };
    if (filters.status) where.status = filters.status;

    return await db.task.findMany({
      where,
      include: { assignee: { select: ASSIGNEE_SELECT } },
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    });
  }

  /** Overdue tasks: dueDate < now AND status != DONE */
  async findOverdueByAssignee(assigneeId) {
    return await db.task.findMany({
      where: {
        assigneeId,
        status: { not: 'DONE' },
        dueDate: { lt: new Date() },
      },
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
  }

  /** Overdue tasks for an entire team (across all projects) */
  async findOverdueByTeam(teamId) {
    return await db.task.findMany({
      where: {
        project: { teamId },
        status: { not: 'DONE' },
        dueDate: { lt: new Date() },
      },
      include: {
        assignee: { select: ASSIGNEE_SELECT },
        project: { select: { id: true, name: true } },
      },
    });
  }

  /** Count tasks per status for a user's assigned tasks */
  async countByStatusForAssignee(assigneeId) {
    const counts = await db.task.groupBy({
      by: ['status'],
      where: { assigneeId },
      _count: { status: true },
    });
    return counts.reduce((acc, row) => {
      acc[row.status] = row._count.status;
      return acc;
    }, {});
  }

  /** Count tasks per status for a whole team */
  async countByStatusForTeam(teamId) {
    const counts = await db.task.groupBy({
      by: ['status'],
      where: { project: { teamId } },
      _count: { status: true },
    });
    return counts.reduce((acc, row) => {
      acc[row.status] = row._count.status;
      return acc;
    }, {});
  }

  async update(taskId, data) {
    return await db.task.update({
      where: { id: taskId },
      data,
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
  }

  async delete(taskId) {
    return await db.task.delete({ where: { id: taskId } });
  }
}

export default new TaskRepositorie();
