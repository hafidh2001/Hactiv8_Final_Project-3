import {
  createTransactionHistory,
  showTransactionUser,
  showTransactionAdmin,
  showTransactionById,
} from "../controllers/transactionHistoryController.js";
import { Router } from "express";
import { authorizationAdmin } from "../middlewares/authorization-admin.js";
import { authorizationTransactionHistory } from "../middlewares/authorization-transactionHistory.js";

const router = Router();

router.post("/", createTransactionHistory);
router.get("/user", showTransactionUser);
router.get("/admin", authorizationAdmin, showTransactionAdmin);
router.get(
  "/:transactionId",
  authorizationTransactionHistory,
  showTransactionById
);

export default router;
