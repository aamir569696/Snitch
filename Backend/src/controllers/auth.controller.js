import UserModel from "../models/user.model.js";
import { config } from "../config/config.js";


import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {expiresIn:"7d"});

    res.cookie("token", token)

    res.status(200).json({
        message,
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

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user= await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isMatch= await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }
    await sendTokenResponse(user,res,"User logged in successfully")


}

const googleAuthCallback = async (req, res) => {

    const { id, displayName, emails, photos }= req.user;

    const email = emails[0].value;
    const profilePicture = photos[0].value;

    let user = await UserModel.findOne({ email });

if (!user) {
        user = await UserModel.create({
            email,
            googleId: id,
            fullname: displayName,
        })
}

const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });

res.cookie("token", token)

res.redirect("http://localhost:5173/");


    // console.log(req.user);

    // res.redirect("http://localhost:5173/dashboard");
}


export { registerUser, loginUser, googleAuthCallback };