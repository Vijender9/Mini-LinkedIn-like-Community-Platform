import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser=  asyncHandler(async(req,res)=>{
    const {name,email,password,bio}=req.body;
    if(!name ||!email || !password){
        throw new ApiError(404,"All fields required");
    }
    const alreadyExistEmail= await User.findOne({email});
    if(alreadyExistEmail){
        throw new ApiError(404,"Email already Exist");
    }

   const hashedPassword= await bcrypt.hash(password,10);

    const newUser= await User.create({
        name,
        email,
        password:hashedPassword,
        bio:bio || null
    })
    await newUser.save();
    return res.status(200).json(new ApiResponse(200,newUser,"User Registered Successfully"))
})

const loginUser= asyncHandler(async(req,res)=>{
    console.log("im inside backend login")
    const {email,password}=req.body;
    if(!email ||!password){
        throw new ApiError(404,"Email or Password Required")
    }
    const user= await User.findOne({email}) ;
    
    if(!user){
        throw new ApiError(404," user Email does not exist!");
    }
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
        throw new ApiError(404,"Password does not match!");
    }
    const { password: pwd, ...safeUser } = user._doc;

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN || "7d"});
   
    return res.status(200).
    json(new ApiResponse(200,{safeUser,token},"User logged in successfull"));

}) 
const getMe= asyncHandler(async(req,res)=>{
    console.log("im iniside getme controler")
    console.log("req.user._id",req.user._id)
    const user= await User.findById(req.user._id).select("-password");

     return res.status(200).json(new ApiResponse(200, user,"User fetched himself Successfully") )
})

const logOutUser= asyncHandler(async(req,res)=>{
    console.log("im inside logout in backend")
    const options = {
    httpOnly: true,

    secure: true
  }
  return res
    .status(200)
    .clearCookie("token", options)
    
    .json(new ApiResponse(200, {}, "User logged Out"))

})

export {registerUser,loginUser,getMe,logOutUser}

