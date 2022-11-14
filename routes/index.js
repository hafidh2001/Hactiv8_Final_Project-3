import { Router } from "express";
import userRoutes from "./userRoutes.js";
import categoriesRoutes from "./categoriesRoutes.js";
import productRoutes from "./productRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import { authentication } from "../middlewares/authentication.js";
import { authorizationAdmin } from "../middlewares/auth-admin.js";

const router = Router();

// make route
router.get("/", (req, res) => {
  res.send("Hactive8 - Final Project 3");
});

// // create same-endpoint
router.use("/users", userRoutes);
router.use(authentication);
router.use("/categories", authorizationAdmin, categoriesRoutes);
router.use("/products", authorizationAdmin, productRoutes);
router.use("/transactions", transactionRoutes);

export default router;
