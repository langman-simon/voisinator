import { Router } from "express";
import {
  login,
  getUser,
  register,
  patchUser,
  deleteUser,
} from "../controllers/user.js";
import {
  createUserValidator,
  patchUserValidator,
  patchRoleByAdminValidator,
} from "../validators/user.js";
import { idValidator } from "../validators/id.js";
import { loginValidator } from "../validators/login.js";
import { validate } from "../middlewares/validations/validate.js";
import { checkJWT } from "../middlewares/authentication/checkJWT.js";
import { checkRole } from "../middlewares/authorization//checkRole.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/login", validate(loginValidator, "body"), login);
router.post("/register", validate(createUserValidator, "body"), register);
router.get(
  "/:id",
  checkJWT,
  validate(idValidator, "params"),
  checkRole(ROLES.USER, ROLES.ADMIN),
  getUser,
);
router.patch(
  "/:id",
  checkJWT,
  validate(idValidator, "params"),
  validate(patchUserValidator, "body"),
  checkRole(ROLES.USER, ROLES.ADMIN),
  patchUser,
);
router.patch(
  "/:id/role",
  checkJWT,
  validate(idValidator, "params"),
  validate(patchRoleByAdminValidator, "body"),
  checkRole(ROLES.ADMIN),
  patchUser,
);
router.delete(
  "/:id",
  checkJWT,
  validate(idValidator, "params"),
  checkRole(ROLES.USER, ROLES.ADMIN),
  deleteUser,
);

export default router;
