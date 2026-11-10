import { Router } from "express";
import * as CategoryController from "../controllers/categoryController.js";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategory);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
