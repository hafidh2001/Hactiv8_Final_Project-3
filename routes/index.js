import { Router } from "express";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import { authentication } from "../middlewares/authentication.js";
import { authorizationAdmin } from "../middlewares/authorization-admin.js";

const router = Router();

// make route
router.get("/", (req, res) => {
  res.send("Hactive8 - Final Project 3");
});

// create same-endpoint
router.use("/users", userRoutes);
router.use(authentication);
router.use("/categories", authorizationAdmin, categoryRoutes);
router.use("/products", () => {});
router.use("/transactions", () => {});

export default router;
