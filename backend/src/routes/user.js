import { Router } from "express";
import {
  getUserById,
  addUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";

const router = Router();

router.get("/:id", getUserById);
router.post("/", addUser);
router.patch("/id", patchUser);
router.delete("/:id", deleteUser);
