import { apiFetch } from './client';

export const tasksApi = {
  create(projectId, data) {
    return apiFetch(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByProject(projectId, filters = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.assigneeId) params.append('assigneeId', filters.assigneeId);
    const query = params.toString();
    return apiFetch(`/projects/${projectId}/tasks${query ? `?${query}` : ''}`);
  },

  getById(taskId) {
    return apiFetch(`/tasks/${taskId}`);
  },

  update(taskId, data) {
    return apiFetch(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(taskId) {
    return apiFetch(`/tasks/${taskId}`, { method: 'DELETE' });
  },

  changeStatus(taskId, status) {
    return apiFetch(`/tasks/${taskId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  assign(taskId, assigneeId) {
    return apiFetch(`/tasks/${taskId}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ assigneeId }),
    });
  },
};
