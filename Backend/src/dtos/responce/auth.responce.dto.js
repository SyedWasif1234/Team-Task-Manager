// HERE WE ARE FORMATING THE RESPONCE TO BE SENT

export class AuthResponceDto {
  static toUserResponce(user) {
    return {
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
    };
  }

  static toAdminResponce(users, total, totalPages, currentPage) {
    return {
      success: true,
      count: users.length,
      total,
      totalPages,
      currentPage,
      data: users,
    };
  }

  static toGenericResponse(message, success = true) {
    return {
      message,
      success,
      status: success, 
    };
  }
}
