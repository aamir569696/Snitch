import UserModel from "../models/user.model.js";
import { config } from "../config/config.js";


import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {expiresIn:"7d"});

    res.cookie("token", token)

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }
    });

}

const registerUser = async (req, res) => {
    const { email, fullname, password, contact, isSeller } = req.body;

    try{

        const existingUser = await UserModel.findOne(
            {$or: [
                {email: email},
                {contact: contact}
              
            ]}
        );
        if(existingUser){
            return res.ststus(400).json({message: "User with this email or contact already exists"})
        }

        const newUser=await UserModel.create({
            email,
            fullname,
            password,
            contact,
          role:isSeller?"seller":"buyer"
        })

        await sendTokenResponse(newUser, res, "User registered successfully");

    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


export { registerUser };