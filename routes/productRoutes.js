import {
  createProduct,
  showProducts,
  updateProduct,
  updateCategoryProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { Router } from "express";

const router = Router();

router.post("/", createProduct);
router.get("/", showProducts);
router.patch("/:productId", updateCategoryProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
