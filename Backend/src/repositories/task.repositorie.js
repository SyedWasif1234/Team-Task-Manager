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
    const formattedDate = dueDate ? new Date(dueDate) : null;
    return await db.task.create({
      data: { 
        title, 
        description, 
        priority, 
        dueDate: formattedDate, 
        projectId, 
        createdBy, 
        assigneeId 
      },
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

  /** Overdue tasks: dueDate < now AND status != DONE (for tasks assigned to OR created by user) */
  async findOverdueByUser(userId) {
    const res =  await db.task.findMany({
      where: {
        AND: [
          { OR: [{ assigneeId: userId }, { createdBy: userId }] },
          { status: { not: 'DONE' } },
          { dueDate: { lt: new Date() } },
        ],
      },
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
    console.log("responce from Overdue api :" , res);
    return res;
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

  /** Count tasks per status for tasks assigned to OR created by user */
  async countByStatusForUser(userId) {
    // Fetch just the status field for all tasks the user is involved in,
    // then count them in JavaScript (avoids Prisma groupBy+OR limitation)
    console.log("user id from cout status api :", userId)
    const tasks = await db.task.findMany({
      where: {
        AND: [
          { OR: [{ assigneeId: userId }, { createdBy: userId }] },
        ],
      },
      select: { status: true },
    });

    console.log("tasks from count status api :" , tasks)

    const counts = { TODO: 0, IN_PROGRESS: 0, IN_REVIEW: 0, DONE: 0 };
    for (const task of tasks) {
      if (counts[task.status] !== undefined) {
        counts[task.status]++;
      }
    }
    console.log("counts from countByStatusForUser :" , counts);
    return counts;
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
    const updateData = { ...data };
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }
    
    return await db.task.update({
      where: { id: taskId },
      data: updateData,
      include: { assignee: { select: ASSIGNEE_SELECT } },
    });
  }

  async delete(taskId) {
    return await db.task.delete({ where: { id: taskId } });
  }
}

export default new TaskRepositorie();
