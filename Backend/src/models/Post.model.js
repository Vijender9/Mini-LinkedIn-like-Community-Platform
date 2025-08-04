import mongoose from "mongoose";
const postSchema= new mongoose.Schema({
     content:{
        type:String,
        required:true
     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     },
      createdAt: { type: Date, default: Date.now },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
},{timestamps:true})
export const Post= new mongoose.model("Post",postSchema)