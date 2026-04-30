// CUSTOM ERROR CLASS FOR TEAM

import { BaseException } from './BaseException.js';
import { TeamErrorCode } from '../dtos/ErrorCode/teamErrorCode.js';

export class TeamException extends BaseException {

  constructor(errorConfig, message) {
    super(errorConfig, message);
  }

  static notFound() {
    return new TeamException(TeamErrorCode.TEAM_NOT_FOUND);
  }

  static accessDenied() {
    return new TeamException(TeamErrorCode.TEAM_ACCESS_DENIED);
  }

  static adminRequired() {
    return new TeamException(TeamErrorCode.TEAM_ADMIN_REQUIRED);
  }

  static ownerRequired() {
    return new TeamException(TeamErrorCode.TEAM_OWNER_REQUIRED);
  }

  static memberAlreadyExists() {
    return new TeamException(TeamErrorCode.TEAM_MEMBER_ALREADY_EXISTS);
  }

  static memberNotFound() {
    return new TeamException(TeamErrorCode.TEAM_MEMBER_NOT_FOUND);
  }

  static cannotRemoveOwner() {
    return new TeamException(TeamErrorCode.TEAM_CANNOT_REMOVE_OWNER);
  }

  static nameRequired() {
    return new TeamException(TeamErrorCode.TEAM_NAME_REQUIRED);
  }
}
