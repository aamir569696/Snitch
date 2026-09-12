import mongoose from "mongoose";
import {config} from "./config.js";

const connectDB =async()=>{
    mongoose.connect(config.MONGO_URL)

    console.log("MongoDB connected")
}

export default connectDB;