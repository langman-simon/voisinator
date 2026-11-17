import { Router } from "express";
import {
  getUser,
  addUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";
import { createUserValidator, patchUserValidator } from "../validators/user.js";
import { idValidator } from "../validators/id.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/:id", validate(idValidator, "params"), getUser);
router.post("/", validate(createUserValidator, "body"), addUser);
router.patch(
  "/:id",
  validate(idUserValidator),
  validate(patchUserValidator, "body"),
  patchUser,
);
router.delete("/:id", validate(idUserValidator, "params"), deleteUser);

export default router;
