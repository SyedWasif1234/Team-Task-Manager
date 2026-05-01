import { apiFetch } from './client';

export const teamsApi = {
  create(data) {
    return apiFetch('/teams', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll() {
    return apiFetch('/teams');
  },

  getById(teamId) {
    return apiFetch(`/teams/${teamId}`);
  },

  update(teamId, data) {
    return apiFetch(`/teams/${teamId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(teamId) {
    return apiFetch(`/teams/${teamId}`, { method: 'DELETE' });
  },

  // Member management
  inviteMember(teamId, email) {
    return apiFetch(`/teams/${teamId}/members`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  listMembers(teamId) {
    return apiFetch(`/teams/${teamId}/members`);
  },

  removeMember(teamId, userId) {
    return apiFetch(`/teams/${teamId}/members/${userId}`, { method: 'DELETE' });
  },

  changeMemberRole(teamId, userId, role) {
    return apiFetch(`/teams/${teamId}/members/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },
};
