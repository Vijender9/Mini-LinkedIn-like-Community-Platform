import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import cors from"cors"

import cookieParser from "cookie-parser"
import { connectDB } from "./database/index.js"
import { DB_NAME } from "./constants.js"

dotenv.config();
const app= express();
app.use(cors({
    origin:https://your-vercel-domain.vercel.app,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

import { router as userRouter } from "./routes/userRoutes.js"
import {router as postRouter} from "./routes/postRoutes.js"
app.use("/api/user",userRouter);
app.use("/api/posts",postRouter);

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is runnig on PORT:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Server connection failed !")
})
