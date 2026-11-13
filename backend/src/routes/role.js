import { Router } from "express";
import * as RoleController from "../controllers/role.js";

const router = Router();

router.get("/", RoleController.getAllRoles);
router.get("/:id", RoleController.getRole);
router.post("/", RoleController.createRole);
router.put("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

export default router;
