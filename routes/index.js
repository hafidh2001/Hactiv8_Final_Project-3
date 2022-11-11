import { Router } from "express";
import userRoutes from "./userRoutes.js";
import { authentication } from "../middlewares/authentication.js";

const router = Router();

// make route
router.get("/", (req, res) => {
  res.send("Hactive8 - Final Project 3");
});

// create same-endpoint
router.use("/users", userRoutes);
router.use("/categories", authentication, () => {});
router.use("/products", authentication, () => {});
router.use("/transactions", authentication, () => {});

export default router;
