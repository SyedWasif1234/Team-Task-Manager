import TeamRepositorie from "../repositories/team.repositorie.js";
import { TeamException } from "../exceptions/team.exception.js";

export const teamAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const teamId = req.params.teamId || req.body.teamId;

    if (!userId || !teamId) {
      throw TeamException.accessDenied();
    }

    const membership = await TeamRepositorie.findMembership(userId, teamId);
    if (!membership) {
      throw TeamException.accessDenied();
    }

    if (membership.role !== 'OWNER' && membership.role !== 'ADMIN') {
      throw TeamException.adminRequired();
    }

    // Attach membership to request
    req.membership = membership;
    next();
  } catch (error) {
    next(error);
  }
};
