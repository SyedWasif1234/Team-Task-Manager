// TEAM REQUEST VALIDATION

export class TeamRequestDto {

  static validateCreate(body) {
    const { name, description, avatarColor } = body;

    if (!name || !name.trim()) {
      return new Error('Team name is required');
    }
    if (name.trim().length > 80) {
      return new Error('Team name must be 80 characters or fewer');
    }

    return {
      name: name.trim(),
      description: description?.trim() || null,
      avatarColor: avatarColor?.trim() || '#6366f1',
    };
  }

  static validateUpdate(body) {
    const { name, description, avatarColor } = body;

    if (name !== undefined && !name.trim()) {
      return new Error('Team name cannot be empty');
    }

    return {
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() || null }),
      ...(avatarColor !== undefined && { avatarColor: avatarColor.trim() }),
    };
  }

  static validateInviteMember(body) {
    const { email } = body;

    if (!email || !email.trim()) {
      return new Error('Member email is required');
    }

    return { email: email.trim().toLowerCase() };
  }

  static validateChangeRole(body) {
    const { role } = body;
    const validRoles = ['OWNER', 'MEMBER'];

    if (!role || !validRoles.includes(role)) {
      return new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }

    return { role };
  }
}
