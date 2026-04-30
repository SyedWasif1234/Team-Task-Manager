// TEAM REPOSITORY — DB CALLS ONLY

import { db } from '../lib/db.js';

export class TeamRepositorie {

  // ── Team CRUD ───────────────────────────────────────────────────────────────

  async create({ name, description, avatarColor, createdBy }) {
    // Create the team and immediately add the creator as OWNER
    return await db.team.create({
      data: {
        name,
        description,
        avatarColor,
        createdBy,
        members: {
          create: {
            userId: createdBy,
            role: 'OWNER',
          },
        },
      },
      include: { members: { include: { user: true } } },
    });
  }

  async findById(teamId) {
    return await db.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          include: { user: { select: { id: true, username: true, email: true, profilePicture: true } } },
        },
        _count: { select: { projects: true } },
      },
    });
  }

  async findAllByUser(userId) {
    // Get all teams where the user is a member
    return await db.team.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        _count: { select: { members: true, projects: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(teamId, data) {
    return await db.team.update({
      where: { id: teamId },
      data,
    });
  }

  async delete(teamId) {
    return await db.team.delete({ where: { id: teamId } });
  }

  // ── Membership ───────────────────────────────────────────────────────────────

  async findMembership(userId, teamId) {
    return await db.teamMember.findUnique({
      where: { userId_teamId: { userId, teamId } },
      include: { user: { select: { id: true, username: true, email: true, profilePicture: true } } },
    });
  }

  async addMember(userId, teamId, role = 'MEMBER') {
    return await db.teamMember.create({
      data: { userId, teamId, role },
      include: { user: { select: { id: true, username: true, email: true, profilePicture: true } } },
    });
  }

  async removeMember(userId, teamId) {
    return await db.teamMember.delete({
      where: { userId_teamId: { userId, teamId } },
    });
  }

  async updateMemberRole(userId, teamId, role) {
    return await db.teamMember.update({
      where: { userId_teamId: { userId, teamId } },
      data: { role },
    });
  }

  async listMembers(teamId) {
    return await db.teamMember.findMany({
      where: { teamId },
      include: {
        user: { select: { id: true, username: true, email: true, profilePicture: true } },
      },
      orderBy: { joinedAt: 'asc' },
    });
  }
}

export default new TeamRepositorie();
