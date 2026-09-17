import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

export const authenticateSeller =async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try{
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user= await UserModel.findById(decoded.userId);

        if (!user || user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden: You are not authorized to perform this action" });
        }

        req.user = user;
        next();


    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
        console.error("Error in authenticateSeller middleware:", error);
    }
}