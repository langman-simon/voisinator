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
import { checkJWT } from "../middlewares/authentication/checkJWT.js";
import { checkRole } from "../middlewares/authorization//checkRole.js";

const router = Router();

router.post("/login", validate(loginValidator, "body"), login);
router.post("/register", validate(createUserValidator, "body"), register);
router.get("/:id", checkJWT, validate(idValidator, "params"), getUser);
router.patch(
  "/:id",
  checkJWT,
  validate(idValidator, "params"),
  validate(patchUserValidator, "body"),
  checkRole,
  patchUser,
);
router.delete("/:id", checkJWT, validate(idValidator, "params"), deleteUser);

export default router;
