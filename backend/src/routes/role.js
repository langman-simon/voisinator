import { Router } from "express";
import * as RoleController from "../controllers/role.js";

import { createRoleSchema, patchRoleSchema } from "../validators/role.js";

import { idValidator } from "../validators/id.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/", RoleController.getAllRoles);
router.get("/:id", validate(idValidator, "params"), RoleController.getRole);
router.post("/", validate(createRoleSchema, "body"), RoleController.createRole);
router.put(
  "/:id",
  validate(idValidator, "params"),
  validate(patchRoleSchema, "body"),
  RoleController.updateRole,
);
router.delete(
  "/:id",
  validate(idValidator, "params"),
  RoleController.deleteRole,
);

export default router;
