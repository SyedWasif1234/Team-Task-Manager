// TEAM ERROR CODES

export const TeamErrorCode = {
  TEAM_NOT_FOUND: {
    code: 'TEAM_001',
    message: 'Team not found',
    status: 404,
  },
  TEAM_ACCESS_DENIED: {
    code: 'TEAM_002',
    message: 'You are not a member of this team',
    status: 403,
  },
  TEAM_ADMIN_REQUIRED: {
    code: 'TEAM_003',
    message: 'Only the team owner or admin can perform this action',
    status: 403,
  },
  TEAM_OWNER_REQUIRED: {
    code: 'TEAM_004',
    message: 'Only the team owner can perform this action',
    status: 403,
  },
  TEAM_MEMBER_ALREADY_EXISTS: {
    code: 'TEAM_005',
    message: 'User is already a member of this team',
    status: 409,
  },
  TEAM_MEMBER_NOT_FOUND: {
    code: 'TEAM_006',
    message: 'Team member not found',
    status: 404,
  },
  TEAM_CANNOT_REMOVE_OWNER: {
    code: 'TEAM_007',
    message: 'The team owner cannot be removed. Transfer ownership first.',
    status: 400,
  },
  TEAM_NAME_REQUIRED: {
    code: 'TEAM_008',
    message: 'Team name is required',
    status: 400,
  },
};
