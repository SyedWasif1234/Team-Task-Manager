// DASHBOARD SERVICE — AGGREGATION LOGIC

import TaskRepositorie from '../repositories/task.repositorie.js';
import TeamRepositorie from '../repositories/team.repositorie.js';
import ProjectRepositorie from '../repositories/project.repositorie.js';
import { TeamException } from '../exceptions/team.exception.js';
import { db } from '../lib/db.js';

class DashboardService {

  /**
   * Personal dashboard — summary of tasks assigned to the logged-in user
   */
  async getPersonalDashboard(userId) {
    const [byStatus, overdueTasks, recentTasks, myTeams] = await Promise.all([
      TaskRepositorie.countByStatusForAssignee(userId),
      TaskRepositorie.findOverdueByAssignee(userId),
      // Last 5 assigned tasks regardless of status
      db.task.findMany({
        where: { assigneeId: userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        include: {
          assignee: { select: { id: true, username: true, email: true, profilePicture: true } },
          project: { select: { id: true, name: true } },
        },
      }),
      TeamRepositorie.findAllByUser(userId),
    ]);

    const totalAssigned =
      (byStatus.TODO ?? 0) +
      (byStatus.IN_PROGRESS ?? 0) +
      (byStatus.IN_REVIEW ?? 0) +
      (byStatus.DONE ?? 0);

    return {
      totalAssigned,
      byStatus,
      overdue: overdueTasks.length,
      recentTasks,
      myTeams: myTeams.map(t => ({
        id: t.id,
        name: t.name,
        avatarColor: t.avatarColor,
        memberCount: t._count?.members,
        projectCount: t._count?.projects,
      })),
    };
  }

  /**
   * Team dashboard — summary of all tasks across a team's projects
   */
  async getTeamDashboard(teamId, userId) {
    // Verify user is a team member
    const membership = await TeamRepositorie.findMembership(userId, teamId);
    if (!membership) throw TeamException.accessDenied();

    const team = await TeamRepositorie.findById(teamId);
    if (!team) throw TeamException.notFound();

    const projects = await ProjectRepositorie.findAllByTeam(teamId);
    const projectCount = projects.length;

    const [byStatus, overdueTasks, recentTasks] = await Promise.all([
      TaskRepositorie.countByStatusForTeam(teamId),
      TaskRepositorie.findOverdueByTeam(teamId),
      // Last 10 tasks updated across all team projects
      db.task.findMany({
        where: { project: { teamId } },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        include: {
          assignee: { select: { id: true, username: true, email: true, profilePicture: true } },
          project: { select: { id: true, name: true } },
        },
      }),
    ]);

    const totalTasks =
      (byStatus.TODO ?? 0) +
      (byStatus.IN_PROGRESS ?? 0) +
      (byStatus.IN_REVIEW ?? 0) +
      (byStatus.DONE ?? 0);

    return {
      team: {
        id: team.id,
        name: team.name,
        avatarColor: team.avatarColor,
      },
      totalTasks,
      byStatus,
      overdue: overdueTasks.length,
      memberCount: team.members?.length ?? 0,
      projectCount,
      recentTasks,
    };
  }
}

export default new DashboardService();
