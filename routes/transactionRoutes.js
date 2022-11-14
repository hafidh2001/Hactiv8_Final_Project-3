import {
    createTransaction,
    showTransaction,
    showTransactionByAdmin,
    showTransactionById
  } from "../controllers/transactionController.js";
  import { Router } from "express";
  import { authorizationAdmin } from "../middlewares/auth-admin.js";
  
  const router = Router();
  
    router.get("/user", showTransaction);
    router.post("/", createTransaction);
    router.get("/admin", authorizationAdmin, showTransactionByAdmin);
    router.get("/:transactionId", showTransactionById);
  
  export default router;
  