import {
  createCategory,
  showCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { Router } from "express";

const router = Router();

router.post("/", createCategory);
router.get("/", showCategories);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
