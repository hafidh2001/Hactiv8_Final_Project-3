import {
    createProduct,
    showProduct,
    updateProduct,
    updateCategoryId,
    deleteProduct
  } from "../controllers/productsController.js";
  import { Router } from "express";
  
  const router = Router();
  
    router.get("/", showProduct);
    router.post("/", createProduct);
    router.put("/:productId", updateProduct);
    router.patch("/:productId", updateCategoryId);
    router.delete("/:productId", deleteProduct);
  
  export default router;
  