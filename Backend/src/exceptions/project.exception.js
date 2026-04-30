// CUSTOM ERROR CLASS FOR PROJECT

import { BaseException } from './BaseException.js';
import { ProjectErrorCode } from '../dtos/ErrorCode/projectErrorCode.js';

export class ProjectException extends BaseException {

  constructor(errorConfig, message) {
    super(errorConfig, message);
  }

  static notFound() {
    return new ProjectException(ProjectErrorCode.PROJECT_NOT_FOUND);
  }

  static accessDenied() {
    return new ProjectException(ProjectErrorCode.PROJECT_ACCESS_DENIED);
  }

  static nameRequired() {
    return new ProjectException(ProjectErrorCode.PROJECT_NAME_REQUIRED);
  }

  static invalidStatus() {
    return new ProjectException(ProjectErrorCode.PROJECT_INVALID_STATUS);
  }
}
