// CUSTOM ERROR CLASS FOR TASK

import { BaseException } from './BaseException.js';
import { TaskErrorCode } from '../dtos/ErrorCode/taskErrorCode.js';

export class TaskException extends BaseException {

  constructor(errorConfig, message) {
    super(errorConfig, message);
  }

  static notFound() {
    return new TaskException(TaskErrorCode.TASK_NOT_FOUND);
  }

  static accessDenied() {
    return new TaskException(TaskErrorCode.TASK_ACCESS_DENIED);
  }

  static titleRequired() {
    return new TaskException(TaskErrorCode.TASK_TITLE_REQUIRED);
  }

  static invalidStatus() {
    return new TaskException(TaskErrorCode.TASK_INVALID_STATUS);
  }

  static invalidPriority() {
    return new TaskException(TaskErrorCode.TASK_INVALID_PRIORITY);
  }

  static assigneeNotMember() {
    return new TaskException(TaskErrorCode.TASK_ASSIGNEE_NOT_MEMBER);
  }
}
