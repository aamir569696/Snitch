import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import UserModel from "../models/user.model.js"; // Make sure path is correct
import { cookie } from "express-validator";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).jason({
        message: "unautorized:user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const authenticateSeller = async (req, res, next) => {
  console.log("🔥 authenticateSeller middleware hit"); // ADD THIS LINE
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // 1. Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // 2. Use decoded.id (not userId) because your JWT payload has "id"
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // 3. Check role
    if (user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not a seller" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Move console.error BEFORE return so you can read the actual error in terminal
    console.error("Error in authenticateSeller middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
