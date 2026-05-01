export class DashboardResponseDto {
  static toPersonalDashboard(data) {
    return {
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
      pendingTasks: data.pendingTasks,
      progressPercentage: data.progressPercentage,
      overdueTasksCount: data.overdue,
      tasksByStatus: {
        TODO: data.byStatus.TODO ?? 0,
        IN_PROGRESS: data.byStatus.IN_PROGRESS ?? 0,
        IN_REVIEW: data.byStatus.IN_REVIEW ?? 0,
        DONE: data.byStatus.DONE ?? 0,
      },
      recentTasks: data.recentTasks,
      teams: data.myTeams
    };
  }

  static toTeamDashboard(data) {
    return {
      team: data.team,
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
      pendingTasks: data.pendingTasks,
      progressPercentage: data.progressPercentage,
      overdueTasksCount: data.overdue,
      tasksByStatus: {
        TODO: data.byStatus.TODO ?? 0,
        IN_PROGRESS: data.byStatus.IN_PROGRESS ?? 0,
        IN_REVIEW: data.byStatus.IN_REVIEW ?? 0,
        DONE: data.byStatus.DONE ?? 0,
      },
      metrics: {
        memberCount: data.memberCount,
        projectCount: data.projectCount
      },
      recentTasks: data.recentTasks
    };
  }
}