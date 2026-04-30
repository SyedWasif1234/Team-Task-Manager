// PROJECT RESPONSE SHAPING

export class ProjectResponseDto {

  static toProject(project) {
    return {
      id:          project.id,
      name:        project.name,
      description: project.description,
      status:      project.status,
      dueDate:     project.dueDate,
      teamId:      project.teamId,
      createdBy:   project.createdBy,
      taskCount:   project.tasks?.length ?? undefined,
      createdAt:   project.createdAt,
      updatedAt:   project.updatedAt,
    };
  }

  static toList(projects) {
    return {
      success: true,
      count:   projects.length,
      data:    projects.map(ProjectResponseDto.toProject),
    };
  }
}
