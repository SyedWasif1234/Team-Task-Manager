import { create } from 'zustand';
import { projectsApi } from '../api/projects.api';

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await projectsApi.getByTeam(teamId);
      set({ projects: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchProjectById: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await projectsApi.getById(projectId);
      set({ currentProject: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createProject: async (teamId, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await projectsApi.create(teamId, data);
      set((state) => ({ projects: [...state.projects, res.data], isLoading: false }));
      return res.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateProject: async (projectId, data) => {
    try {
      const res = await projectsApi.update(projectId, data);
      set((state) => ({
        projects: state.projects.map((p) => (p.id === projectId ? res.data : p)),
        currentProject: state.currentProject?.id === projectId ? res.data : state.currentProject,
      }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteProject: async (projectId) => {
    try {
      await projectsApi.delete(projectId);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
        currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
      }));
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
