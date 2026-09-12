import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { validateRegisterUserRules } from "../validator/auth.validator.js";

const router = Router();

router.post("/register", validateRegisterUserRules, registerUser);

export default router;