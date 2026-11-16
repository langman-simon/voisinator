import { Router } from "express";
import {
  getUser,
  addUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";
import { createUserValidator } from "../validators/user.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/:id", getUser);
router.post("/", validate(createUserValidator), addUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
