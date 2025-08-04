import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";


const authMiddleware =asyncHandler(async(req,res,next)=>{

    const authHeader=req.headers.authorization;

      console.log("authHeader is :",authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new ApiError(401,"Unauthorized : No token provided");
    }

//     const token= authHeader.split(" ")[1];
//     console.log("token in middleware",token);
   
//     const decoded =jwt.verify(token,process.env.JWT_SECRET);
   
//     console.log("tokend decoded is:",decoded)
//     const user= await User.findById(decoded.userId).select("-password");
//     if(!user){
//         throw new ApiError(404,"User not found");
//     }
    
//     req.user=user;

   
//     next();


// })
try {
    const token= authHeader.split(" ")[1];
//     console.log("token in middleware",token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token decoded is:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    // Catch token errors like expired, invalid signature, etc.
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired. Please log in again.");
    } else if (err.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token. Please log in again.");
    } else {
      throw new ApiError(500, "Internal Server Error");
    }
  }
});
export default authMiddleware