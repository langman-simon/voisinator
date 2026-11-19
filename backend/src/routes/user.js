import { Router } from "express";
import {
  login,
  getUser,
  register,
  patchUser,
  deleteUser,
} from "../controllers/user.js";
import { createUserValidator, patchUserValidator } from "../validators/user.js";
import { idValidator } from "../validators/id.js";
import { loginValidator } from "../validators/login.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/:id", validate(idValidator, "params"), getUser);
router.post("/", validate(createUserValidator, "body"), register);
router.get("/login", validate(loginValidator, "body"), login);
router.patch(
  "/:id",
  validate(idValidator),
  validate(patchUserValidator, "body"),
  patchUser,
);
router.delete("/:id", validate(idValidator, "params"), deleteUser);

export default router;
