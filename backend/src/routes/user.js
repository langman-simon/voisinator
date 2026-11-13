import { Router } from "express";
import {
  getUser,
  addUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";

const router = Router();

router.get("/:id", getUser);
router.post("/", addUser);
router.patch("/id", patchUser);
router.delete("/:id", deleteUser);

export default router;
