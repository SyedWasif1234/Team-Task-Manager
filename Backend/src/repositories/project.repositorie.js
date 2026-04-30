// PROJECT REPOSITORY — DB CALLS ONLY

import { db } from '../lib/db.js';

export class ProjectRepositorie {

  async create({ name, description, status, dueDate, teamId, createdBy }) {
    return await db.project.create({
      data: { name, description, status, dueDate, teamId, createdBy },
    });
  }

  async findById(projectId) {
    return await db.project.findUnique({
      where: { id: projectId },
      include: {
        _count: { select: { tasks: true } },
      },
    });
  }

  async findAllByTeam(teamId) {
    return await db.project.findMany({
      where: { teamId },
      include: {
        _count: { select: { tasks: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(projectId, data) {
    return await db.project.update({
      where: { id: projectId },
      data,
    });
  }

  async delete(projectId) {
    return await db.project.delete({ where: { id: projectId } });
  }
}

export default new ProjectRepositorie();
