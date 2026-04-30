// HERE WE WILL WRITE THE LOGIC TO TALK TO DATA-BASE ONLY

import { db } from "../lib/db.js";

export class UserRepositorie {
  async GetByEmail(email) {
    return await db.user.findUnique({
      where: { email },
    });
  }

  async findById(userId) {
    return await db.user.findUnique({
      where: { id: userId },
    });
  }

  async findByResetToken(hashedToken) {
    return await db.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() }, // token must not be expired
      },
    });
  }

  async findManyByIds(userIds) {
    return await db.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, email: true, profilePicture: true },
    });
  }

  async create(userData) {
    return await db.user.create({
      data: userData,
    });
  }

  async update(userId, userData) {
    return await db.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  async delete(userId) {
    try {
      return await db.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      // Return null if not found
      if (error.code === 'P2025') return null;
      throw error;
    }
  }

  async GetAllusers(skip, limit) {
    const [users, total] = await Promise.all([
      db.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.user.count(),
    ]);

    return { users, total };
  }
}

export default new UserRepositorie();

/* Singleton pattern — heavy lifting done once on module load */
