// PROJECT REQUEST VALIDATION

const VALID_STATUSES = ['ACTIVE', 'ON_HOLD', 'ARCHIVED'];

export class ProjectRequestDto {

  static validateCreate(body) {
    const { name, description, dueDate, status } = body;

    if (!name || !name.trim()) {
      return new Error('Project name is required');
    }
    if (name.trim().length > 120) {
      return new Error('Project name must be 120 characters or fewer');
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return new Error('dueDate must be a valid ISO date string');
    }

    return {
      name: name.trim(),
      description: description?.trim() || null,
      status: status || 'ACTIVE',
      dueDate: dueDate ? new Date(dueDate) : null,
    };
  }

  static validateUpdate(body) {
    const { name, description, dueDate, status } = body;

    if (name !== undefined && !name.trim()) {
      return new Error('Project name cannot be empty');
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return new Error('dueDate must be a valid ISO date string');
    }

    return {
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() || null }),
      ...(status !== undefined && { status }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
    };
  }
}
