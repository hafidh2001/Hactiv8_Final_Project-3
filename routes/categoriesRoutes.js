import {
    createCategory,
    showCategory,
    updateCategory,
    deleteCategory
  } from "../controllers/categoriesController.js";
  import { Router } from "express";
  
  const router = Router();
  
    router.get("/", showCategory);
    router.post("/", createCategory);
    router.patch("/:categoryId", updateCategory);
    router.delete("/:categoryId", deleteCategory);
  
  export default router;
  