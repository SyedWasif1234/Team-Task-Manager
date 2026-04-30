// TASK RESPONSE SHAPING

export class TaskResponseDto {

  static toTask(task) {
    return {
      id:          task.id,
      title:       task.title,
      description: task.description,
      status:      task.status,
      priority:    task.priority,
      dueDate:     task.dueDate,
      isOverdue:   task.dueDate ? (task.status !== 'DONE' && new Date(task.dueDate) < new Date()) : false,
      projectId:   task.projectId,
      createdBy:   task.createdBy,
      assignee:    task.assignee
        ? {
            id:             task.assignee.id,
            username:       task.assignee.username,
            email:          task.assignee.email,
            profilePicture: task.assignee.profilePicture,
          }
        : null,
      createdAt:   task.createdAt,
      updatedAt:   task.updatedAt,
    };
  }

  static toList(tasks) {
    return {
      success: true,
      count:   tasks.length,
      data:    tasks.map(TaskResponseDto.toTask),
    };
  }
}
