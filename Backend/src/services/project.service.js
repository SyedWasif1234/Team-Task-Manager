// PROJECT SERVICE — BUSINESS LOGIC

import ProjectRepositorie from '../repositories/project.repositorie.js';
import TeamRepositorie from '../repositories/team.repositorie.js';
import { ProjectException } from '../exceptions/project.exception.js';
import { TeamException } from '../exceptions/team.exception.js';

class ProjectService {

  async createProject(teamId, userId, data) {
    // Verify team exists and user is a member
    const membership = await TeamRepositorie.findMembership(userId, teamId);
    if (!membership) throw TeamException.accessDenied();

    return await ProjectRepositorie.create({ ...data, teamId, createdBy: userId });
  }

  async getProjectsByTeam(teamId, userId) {
    // Verify user is a team member
    const membership = await TeamRepositorie.findMembership(userId, teamId);
    if (!membership) throw TeamException.accessDenied();

    return await ProjectRepositorie.findAllByTeam(teamId);
  }

  async getProjectById(projectId, userId) {
    const project = await ProjectRepositorie.findById(projectId);
    if (!project) throw ProjectException.notFound();

    // Verify user is a member of the project's team
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw ProjectException.accessDenied();

    return project;
  }

  async updateProject(projectId, userId, data) {
    const project = await ProjectRepositorie.findById(projectId);
    if (!project) throw ProjectException.notFound();

    // Only team owner or project creator can update
    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw ProjectException.accessDenied();
    if (membership.role !== 'OWNER' && project.createdBy !== userId) {
      throw ProjectException.accessDenied();
    }

    return await ProjectRepositorie.update(projectId, data);
  }

  async deleteProject(projectId, userId) {
    const project = await ProjectRepositorie.findById(projectId);
    if (!project) throw ProjectException.notFound();

    const membership = await TeamRepositorie.findMembership(userId, project.teamId);
    if (!membership) throw ProjectException.accessDenied();
    if (membership.role !== 'OWNER' && project.createdBy !== userId) {
      throw ProjectException.accessDenied();
    }

    return await ProjectRepositorie.delete(projectId);
  }
}

export default new ProjectService();