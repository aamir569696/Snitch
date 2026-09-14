import { Router } from "express";
import { registerUser,loginUser } from "../controllers/auth.controller.js";
import { validateRegisterUserRules,validateLoginUserRules } from "../validator/auth.validator.js";

const router = Router();

router.post("/register", validateRegisterUserRules, registerUser);
router.post("/login", validateLoginUserRules, loginUser);

export default router;