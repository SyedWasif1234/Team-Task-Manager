// API base URL — goes through Vite proxy in development
export const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

// Task statuses in display order
export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

export const TASK_STATUS_LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
};

export const TASK_STATUS_COLORS = {
  TODO: 'var(--text-muted)',
  IN_PROGRESS: 'var(--accent)',
  IN_REVIEW: 'var(--warning)',
  DONE: 'var(--success)',
};

export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export const TASK_PRIORITY_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const TASK_PRIORITY_COLORS = {
  LOW: '#22c55e',
  MEDIUM: '#f59e0b',
  HIGH: '#f97316',
  CRITICAL: '#ef4444',
};

export const PROJECT_STATUSES = ['ACTIVE', 'ON_HOLD', 'ARCHIVED'];

export const PROJECT_STATUS_LABELS = {
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  ARCHIVED: 'Archived',
};

export const TEAM_ROLES = ['OWNER', 'ADMIN', 'MEMBER'];

export const TEAM_ROLE_LABELS = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  MEMBER: 'Member',
};
