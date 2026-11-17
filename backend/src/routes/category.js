import { Router } from "express";
import * as CategoryController from "../controllers/category.js";

import {
  createCategorySchema,
  patchCategorySchema,
} from "../validators/category.js";

import { idValidator } from "../validators/id.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get(
  "/:id",
  validate(idValidator, "params"),
  CategoryController.getCategory,
);
router.post(
  "/",
  validate(createCategorySchema, "body"),
  CategoryController.createCategory,
);
router.patch(
  "/:id",
  validate(idValidator, "params"),
  validate(patchCategorySchema, "body"),
  CategoryController.updateCategory,
);
router.delete(
  "/:id",
  validate(idValidator, "params"),
  CategoryController.deleteCategory,
);

export default router;
