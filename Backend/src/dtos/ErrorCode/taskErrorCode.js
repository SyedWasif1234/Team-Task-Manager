// TASK ERROR CODES

export const TaskErrorCode = {
  TASK_NOT_FOUND: {
    code: 'TASK_001',
    message: 'Task not found',
    status: 404,
  },
  TASK_ACCESS_DENIED: {
    code: 'TASK_002',
    message: 'You do not have permission to modify this task',
    status: 403,
  },
  TASK_TITLE_REQUIRED: {
    code: 'TASK_003',
    message: 'Task title is required',
    status: 400,
  },
  TASK_INVALID_STATUS: {
    code: 'TASK_004',
    message: 'Invalid task status. Must be TODO | IN_PROGRESS | IN_REVIEW | DONE',
    status: 400,
  },
  TASK_INVALID_PRIORITY: {
    code: 'TASK_005',
    message: 'Invalid task priority. Must be LOW | MEDIUM | HIGH | CRITICAL',
    status: 400,
  },
  TASK_ASSIGNEE_NOT_MEMBER: {
    code: 'TASK_006',
    message: 'Assignee must be a member of the project team',
    status: 400,
  },
};
