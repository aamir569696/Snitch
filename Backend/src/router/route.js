import { Router } from "express";
import { registerUser,loginUser,googleAuthCallback,getMe } from "../controllers/auth.controller.js";
import { validateRegisterUserRules,validateLoginUserRules } from "../validator/auth.validator.js";
import passport from "passport";
import { authenticateUser } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/register", validateRegisterUserRules, registerUser);
router.post("/login", validateLoginUserRules, loginUser);
router.get("/me",authenticateUser,getMe)


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false,failureRedirect:"http://localhost:5173/login" }), googleAuthCallback);

export default router;