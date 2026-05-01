import { apiFetch } from './client';

export const dashboardApi = {
  getMyDashboard() {
    return apiFetch('/dashboard/my-dashboard');
  },

  getTeamDashboard(teamId) {
    return apiFetch(`/dashboard/team/${teamId}`);
  },
};
