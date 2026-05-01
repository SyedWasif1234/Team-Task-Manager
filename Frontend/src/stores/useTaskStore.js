import { create } from 'zustand';
import { tasksApi } from '../api/tasks.api';
import { useDashboardStore } from './useDashboardStore';

export const useTaskStore = create((set) => ({
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,

  fetchTasks: async (projectId, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await tasksApi.getByProject(projectId, filters);
      set({ tasks: res.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createTask: async (projectId, data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await tasksApi.create(projectId, data);
      set((state) => ({ tasks: [...state.tasks, res.data], isLoading: false }));
      useDashboardStore.getState().fetchDashboard();
      return res.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateTask: async (taskId, data) => {
    try {
      const res = await tasksApi.update(taskId, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === taskId ? res.data : t)),
        currentTask: state.currentTask?.id === taskId ? res.data : state.currentTask,
      }));
      useDashboardStore.getState().fetchDashboard();
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await tasksApi.delete(taskId);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId),
        currentTask: state.currentTask?.id === taskId ? null : state.currentTask,
      }));
      useDashboardStore.getState().fetchDashboard();
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  changeStatus: async (taskId, status) => {
    try {
      const res = await tasksApi.changeStatus(taskId, status);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status, ...res.data } : t)),
      }));
      useDashboardStore.getState().fetchDashboard();
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  assignTask: async (taskId, assigneeId) => {
    try {
      const res = await tasksApi.assign(taskId, assigneeId);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...res.data } : t)),
      }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  setCurrentTask: (task) => set({ currentTask: task }),
  clearError: () => set({ error: null }),
}));
