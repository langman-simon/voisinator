import * as userModel from "../../models/user.js";
import { pool } from "../../database/db.js";

export const checkRole = async (req, res, next) => {
  try {
    const payloadId = req.user.id;
    const clientId = req.val.id;
    if (payloadId === clientId) {
      return next();
    }

    const user = await userModel.readUserById(pool, {
      id: payloadId,
    });
    if (!user) {
      return res.status(401).json({
        message: "Authenticated user not found",
      });
    }
    if (user.role_label === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Action or page not allowed",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
