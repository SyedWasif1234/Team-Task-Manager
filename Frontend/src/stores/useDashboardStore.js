import { create } from 'zustand';
import { dashboardApi } from '../api/dashboard.api';

export const useDashboardStore = create((set) => ({
  dashboard: null,
  teamDashboard: null,
  isLoading: false,
  error: null,

  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await dashboardApi.getMyDashboard();
      console.log("res for dashboard :" , res);
      console.log('[DashboardStore] full API response:', JSON.stringify(res));
      console.log('[DashboardStore] res.data:', JSON.stringify(res?.data));
      set({ dashboard: res, isLoading: false });
    } catch (err) {
      console.error('[DashboardStore] fetch error:', err.message, err.status);
      set({ error: err.message, isLoading: false });
    }
  },

  fetchTeamDashboard: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await dashboardApi.getTeamDashboard(teamId);
      set({ teamDashboard: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
