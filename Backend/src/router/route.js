import { Router } from "express";
import { registerUser,loginUser,googleAuthCallback } from "../controllers/auth.controller.js";
import { validateRegisterUserRules,validateLoginUserRules } from "../validator/auth.validator.js";

import passport from "passport";


const router = Router();

router.post("/register", validateRegisterUserRules, registerUser);
router.post("/login", validateLoginUserRules, loginUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);

export default router;