// TASK REQUEST VALIDATION

const VALID_STATUSES  = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export class TaskRequestDto {

  static validateCreate(body) {
    const { title, description, priority, dueDate, assigneeId } = body;

    if (!title || !title.trim()) {
      return new Error('Task title is required');
    }
    if (title.trim().length > 200) {
      return new Error('Task title must be 200 characters or fewer');
    }
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return new Error(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return new Error('dueDate must be a valid ISO date string');
    }

    return {
      title: title.trim(),
      description: description?.trim() || null,
      priority: priority || 'MEDIUM',
      dueDate: dueDate ? new Date(dueDate) : null,
      assigneeId: assigneeId || null,
    };
  }

  static validateUpdate(body) {
    const { title, description, priority, dueDate, assigneeId } = body;

    if (title !== undefined && !title.trim()) {
      return new Error('Task title cannot be empty');
    }
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return new Error(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return new Error('dueDate must be a valid ISO date string');
    }

    return {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() || null }),
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      ...(assigneeId !== undefined && { assigneeId: assigneeId || null }),
    };
  }

  static validateStatus(body) {
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    return { status };
  }

  static validateAssign(body) {
    const { assigneeId } = body;
    // assigneeId can be null to unassign
    return { assigneeId: assigneeId || null };
  }
}
