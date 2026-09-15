
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import cookieParser from "cookie-parser"
dotenv.config();
const app = express();
console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



import userRoutes from "./routes/user.routes.js";
import explanationRoutes from "./routes/explanation.routes.js";
import sessionRoutes from "./routes/session.routes.js";


app.use("/api/users", userRoutes);
app.use("/api/explanations", explanationRoutes);
app.use("/api/sessions", sessionRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
        errors: error.errors || []
    });
});


export { app }
