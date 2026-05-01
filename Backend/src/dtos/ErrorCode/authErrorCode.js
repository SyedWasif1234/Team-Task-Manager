

export const AuthErrorCode = {
  AUTH_INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    message: 'Invalid email or password',
    status: 401,
  },
  AUTH_TOKEN_EXPIRED: {
    code: 'AUTH_002',
    message: 'Authentication token has expired',
    status: 401,
  },
  AUTH_TOKEN_MISSING: {
    code: 'AUTH_003',
    message: 'Authentication token is missing',
    status: 401,
  },
  AUTH_TOKEN_INVALID: {
    code: 'AUTH_004',
    message: 'Authentication token is invalid',
    status: 401,
  },
  AUTH_FORBIDDEN: {
    code: 'AUTH_005',
    message: 'You do not have permission to perform this action',
    status: 403,
  },
  USER_NOT_FOUND: {
    code: 'USER_001',
    message: 'User not found in the system',
    status: 404,
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_002',
    message: 'A user with this email already exists',
    status: 409,
  },
};