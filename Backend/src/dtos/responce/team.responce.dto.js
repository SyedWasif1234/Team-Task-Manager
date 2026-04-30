// TEAM RESPONSE SHAPING

export class TeamResponseDto {

  static toTeam(team) {
    return {
      id:          team.id,
      name:        team.name,
      description: team.description,
      avatarColor: team.avatarColor,
      createdBy:   team.createdBy,
      memberCount: team.members?.length ?? undefined,
      createdAt:   team.createdAt,
      updatedAt:   team.updatedAt,
    };
  }

  static toTeamWithMembers(team) {
    return {
      ...TeamResponseDto.toTeam(team),
      members: team.members?.map(TeamResponseDto.toMember) ?? [],
    };
  }

  static toMember(member) {
    return {
      id:       member.id,
      role:     member.role,
      joinedAt: member.joinedAt,
      user: {
        id:             member.user?.id,
        username:       member.user?.username,
        email:          member.user?.email,
        profilePicture: member.user?.profilePicture,
      },
    };
  }

  static toList(teams) {
    return {
      success: true,
      count:   teams.length,
      data:    teams.map(TeamResponseDto.toTeam),
    };
  }
}
