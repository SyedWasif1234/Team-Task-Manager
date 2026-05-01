import { create } from 'zustand';
import { teamsApi } from '../api/teams.api';

export const useTeamStore = create((set, get) => ({
  teams: [],
  currentTeam: null,
  members: [],
  isLoading: false,
  error: null,

  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await teamsApi.getAll();
      set({ teams: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchTeamById: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await teamsApi.getById(teamId);
      set({ currentTeam: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createTeam: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await teamsApi.create(data);
      set((state) => ({ teams: [...state.teams, res.data], isLoading: false }));
      return res.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateTeam: async (teamId, data) => {
    try {
      const res = await teamsApi.update(teamId, data);
      set((state) => ({
        teams: state.teams.map((t) => (t.id === teamId ? res.data : t)),
        currentTeam: state.currentTeam?.id === teamId ? res.data : state.currentTeam,
      }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteTeam: async (teamId) => {
    try {
      await teamsApi.delete(teamId);
      set((state) => ({
        teams: state.teams.filter((t) => t.id !== teamId),
        currentTeam: state.currentTeam?.id === teamId ? null : state.currentTeam,
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  // Members
  fetchMembers: async (teamId) => {
    try {
      const res = await teamsApi.listMembers(teamId);
      set({ members: res.data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  inviteMember: async (teamId, email) => {
    try {
      const res = await teamsApi.inviteMember(teamId, email);
      set((state) => ({ members: [...state.members, res.data] }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  removeMember: async (teamId, userId) => {
    try {
      await teamsApi.removeMember(teamId, userId);
      set((state) => ({ members: state.members.filter((m) => m.userId !== userId) }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  changeMemberRole: async (teamId, userId, role) => {
    try {
      const res = await teamsApi.changeMemberRole(teamId, userId, role);
      set((state) => ({
        members: state.members.map((m) => (m.userId === userId ? { ...m, ...res.data } : m)),
      }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
