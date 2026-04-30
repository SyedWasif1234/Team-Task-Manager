import TeamRepositorie from "../repositories/team.repositorie.js";
import { TeamException } from "../exceptions/team.exception.js";

export const teamAuth = async (req, res, next) => {
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

    // Attach membership to request for downstream use if needed
    req.membership = membership;
    next();
  } catch (error) {
    next(error);
  }
};
