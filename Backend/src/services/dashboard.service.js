import TaskRepositorie from '../repositories/task.repositorie.js';
import TeamRepositorie from '../repositories/team.repositorie.js';
import ProjectRepositorie from '../repositories/project.repositorie.js';
import { TeamException } from '../exceptions/team.exception.js';
import { db } from '../lib/db.js';

class DashboardService {

  async getMyDashboard(userId) {
    console.log("userId from getMy dashboard :" , userId)
    const [byStatus, overdueTasks, recentTasks, myTeams] = await Promise.all([
      TaskRepositorie.countByStatusForUser(userId),
      TaskRepositorie.findOverdueByUser(userId),
      db.task.findMany({
        where: {
          OR: [{ assigneeId: userId }, { createdBy: userId }]
        },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        include: {
          assignee: { select: { id: true, username: true, email: true, profilePicture: true } },
          project: { select: { id: true, name: true } },
        },
      }),
      TeamRepositorie.findAllByUser(userId),
    ]);
    console.log("by status:" ,byStatus)
    console.log("myTeams:", myTeams)

    // Perform Metrics Math
    const totalTasks = byStatus.TODO + byStatus.IN_PROGRESS + byStatus.IN_REVIEW + byStatus.DONE;
    const completedTasks = byStatus.DONE;
    const pendingTasks = totalTasks - completedTasks;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      progressPercentage, // CRITICAL: Required for frontend progress bar
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

  async getTeamDashboard(teamId, userId) {
    const membership = await TeamRepositorie.findMembership(userId, teamId);
    if (!membership) throw TeamException.accessDenied();

    const team = await TeamRepositorie.findById(teamId);
    if (!team) throw TeamException.notFound();

    const projects = await ProjectRepositorie.findAllByTeam(teamId);
    const projectCount = projects.length;

    const [byStatus, overdueTasks, recentTasks] = await Promise.all([
      TaskRepositorie.countByStatusForTeam(teamId),
      TaskRepositorie.findOverdueByTeam(teamId),
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

    // Perform Metrics Math
    const totalTasks = byStatus.TODO + byStatus.IN_PROGRESS + byStatus.IN_REVIEW + byStatus.DONE;
    const completedTasks = byStatus.DONE;
    const pendingTasks = totalTasks - completedTasks;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      team: { id: team.id, name: team.name, avatarColor: team.avatarColor },
      totalTasks,
      completedTasks,
      pendingTasks,
      progressPercentage, // CRITICAL
      byStatus,
      overdue: overdueTasks.length,
      memberCount: team.members?.length ?? 0,
      projectCount,
      recentTasks,
    };
  }
}

export default new DashboardService();