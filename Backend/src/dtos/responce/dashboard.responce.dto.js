// DASHBOARD RESPONSE SHAPING

export class DashboardResponseDto {

  static toPersonalDashboard(data) {
    return {
      success: true,
      data: {
        totalAssigned:    data.totalAssigned,
        byStatus: {
          TODO:        data.byStatus.TODO        ?? 0,
          IN_PROGRESS: data.byStatus.IN_PROGRESS ?? 0,
          IN_REVIEW:   data.byStatus.IN_REVIEW   ?? 0,
          DONE:        data.byStatus.DONE         ?? 0,
        },
        overdue:          data.overdue,
        recentTasks:      data.recentTasks,
        myTeams:          data.myTeams,
      },
    };
  }

  static toTeamDashboard(data) {
    return {
      success: true,
      data: {
        team:          data.team,
        totalTasks:    data.totalTasks,
        byStatus: {
          TODO:        data.byStatus.TODO        ?? 0,
          IN_PROGRESS: data.byStatus.IN_PROGRESS ?? 0,
          IN_REVIEW:   data.byStatus.IN_REVIEW   ?? 0,
          DONE:        data.byStatus.DONE         ?? 0,
        },
        overdue:       data.overdue,
        memberCount:   data.memberCount,
        projectCount:  data.projectCount,
        recentTasks:   data.recentTasks,
      },
    };
  }
}
