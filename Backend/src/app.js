import authrouter from "./router/route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import cors from "cors";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);

    // Handle the user profile after successful Google authentication
}));

// app.use(cors( {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

app.use("/api/auth", authrouter);

export default app;