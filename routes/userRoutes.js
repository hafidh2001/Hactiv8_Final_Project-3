import {
  showUser,
  registerUser,
  loginUser,
  updateUser,
  topupUser,
  deleteUser,
} from "../controllers/userController.js";
import { authentication } from "../middlewares/authentication.js";
import { Router } from "express";

const router = Router();

router.get("/", showUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/topup", authentication, topupUser);
router.put("/:userId", authentication, updateUser);
router.delete("/:userId", authentication, deleteUser);

export default router;
