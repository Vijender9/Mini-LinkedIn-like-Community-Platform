import express from "express"
import { getMe, loginUser, logOutUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router= express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/getMe",authMiddleware ,getMe);
router.post("/logout",authMiddleware,logOutUser);
export {router}