// TEAM SERVICE — BUSINESS LOGIC

import TeamRepositorie from '../repositories/team.repositorie.js';
import UserRepositorie from '../repositories/user.repositorie.js';
import { TeamException } from '../exceptions/team.exception.js';
import { AuthException } from '../exceptions/auth.exception.js';

class TeamService {

  async createTeam(userId, data) {
    const team = await TeamRepositorie.create({ ...data, createdBy: userId });
    return team;
  }

  async getMyTeams(userId) {
    return await TeamRepositorie.findAllByUser(userId);
  }

  async getTeamById(teamId, requestingUserId) {
    const team = await TeamRepositorie.findById(teamId);
    if (!team) throw TeamException.notFound();

    // Verify the requesting user is a member
    const isMember = team.members.some(m => m.userId === requestingUserId);
    if (!isMember) throw TeamException.accessDenied();

    return team;
  }

  async updateTeam(teamId, requestingUserId, data) {
    const membership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!membership) throw TeamException.accessDenied();
    if (membership.role !== 'OWNER') throw TeamException.adminRequired();

    return await TeamRepositorie.update(teamId, data);
  }

  async deleteTeam(teamId, requestingUserId) {
    const membership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!membership) throw TeamException.accessDenied();
    if (membership.role !== 'OWNER') throw TeamException.ownerRequired();

    return await TeamRepositorie.delete(teamId);
  }

  async inviteMember(teamId, requestingUserId, inviteeEmail) {
    // Only OWNER can invite
    const membership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!membership) throw TeamException.accessDenied();
    if (membership.role !== 'OWNER') throw TeamException.adminRequired();

    // Find the user to invite
    const invitee = await UserRepositorie.GetByEmail(inviteeEmail);
    if (!invitee) throw AuthException.userNotFound();

    // Check for existing membership
    const existing = await TeamRepositorie.findMembership(invitee.id, teamId);
    if (existing) throw TeamException.memberAlreadyExists();

    return await TeamRepositorie.addMember(invitee.id, teamId, 'MEMBER');
  }

  async removeMember(teamId, requestingUserId, targetUserId) {
    const requestorMembership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!requestorMembership) throw TeamException.accessDenied();
    if (requestorMembership.role !== 'OWNER') throw TeamException.adminRequired();

    const targetMembership = await TeamRepositorie.findMembership(targetUserId, teamId);
    if (!targetMembership) throw TeamException.memberNotFound();
    if (targetMembership.role === 'OWNER') throw TeamException.cannotRemoveOwner();

    return await TeamRepositorie.removeMember(targetUserId, teamId);
  }

  async changeMemberRole(teamId, requestingUserId, targetUserId, role) {
    const membership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!membership) throw TeamException.accessDenied();
    if (membership.role !== 'OWNER') throw TeamException.ownerRequired();

    const targetMembership = await TeamRepositorie.findMembership(targetUserId, teamId);
    if (!targetMembership) throw TeamException.memberNotFound();

    return await TeamRepositorie.updateMemberRole(targetUserId, teamId, role);
  }

  async listMembers(teamId, requestingUserId) {
    const membership = await TeamRepositorie.findMembership(requestingUserId, teamId);
    if (!membership) throw TeamException.accessDenied();

    return await TeamRepositorie.listMembers(teamId);
  }
}

export default new TeamService();
