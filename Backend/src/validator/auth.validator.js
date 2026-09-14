import {body, validationResult} from "express-validator";

function vlidateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegisterUserRules = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname").notEmpty().withMessage("Full name is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),

    vlidateRequest
]

export const validateLoginUserRules = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    vlidateRequest
]