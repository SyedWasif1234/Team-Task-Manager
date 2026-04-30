// PROJECT ERROR CODES

export const ProjectErrorCode = {
  PROJECT_NOT_FOUND: {
    code: 'PROJ_001',
    message: 'Project not found',
    status: 404,
  },
  PROJECT_ACCESS_DENIED: {
    code: 'PROJ_002',
    message: 'You do not have permission to access this project',
    status: 403,
  },
  PROJECT_NAME_REQUIRED: {
    code: 'PROJ_003',
    message: 'Project name is required',
    status: 400,
  },
  PROJECT_INVALID_STATUS: {
    code: 'PROJ_004',
    message: 'Invalid project status. Must be ACTIVE | ON_HOLD | ARCHIVED',
    status: 400,
  },
};
