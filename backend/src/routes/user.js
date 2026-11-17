import { Router } from "express";
import {
  getUser,
  addUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";
import {
  createUserValidator,
  patchUserValidator,
  idUserValidator,
} from "../validators/user.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/:id", validate(idUserValidator), getUser);
router.post("/", validate(createUserValidator), addUser);
router.patch("/:id", validate(patchUserValidator), patchUser);
router.delete("/:id", validate(idUserValidator), deleteUser);

export default router;
