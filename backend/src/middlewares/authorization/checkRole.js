import * as userModel from "../../models/user.js";
import { pool } from "../../database/db.js";

export const checkRole = (...roleList) => {
  return async (req, res, next) => {
    try {
      const user = await userModel.readUserById(pool, { id: req.user.id });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!roleList.includes(user.role_label)) {
        return res.status(403).json({ message: "Action or page not allowed" });
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
