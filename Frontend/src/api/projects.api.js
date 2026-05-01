import { apiFetch } from './client';

export const projectsApi = {
  create(teamId, data) {
    return apiFetch(`/teams/${teamId}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByTeam(teamId) {
    return apiFetch(`/teams/${teamId}/projects`);
  },

  getById(projectId) {
    return apiFetch(`/${projectId}`).catch(() => {
      // The project routes are mounted at /api/v1, so the path is /api/v1/:projectId
      return apiFetch(`/projects/${projectId}`);
    });
  },

  update(projectId, data) {
    return apiFetch(`/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(projectId) {
    return apiFetch(`/${projectId}`, { method: 'DELETE' });
  },
};
