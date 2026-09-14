import authrouter from "./router/route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// app.use(cors( {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

app.use("/api/auth", authrouter);

export default app;