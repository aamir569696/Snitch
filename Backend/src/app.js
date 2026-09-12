import authrouter from "./router/route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import express from "express";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authrouter);

export default app;