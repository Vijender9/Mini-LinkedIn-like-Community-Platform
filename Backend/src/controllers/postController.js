import { json } from "express";
import { Post } from "../models/Post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
const createPost= asyncHandler(async(req,res)=>{
    console.log("im inside createpost")
    const{content}=req.body;
    if(!content){
        throw new ApiError(404,"Content is not posted");
    }
    
    
    const newPost= await Post.create({
        content:req.body.content,
        author:req.user._id,

    })
    return res.status(200).json(new ApiResponse(200,newPost,"Post created successfully"));

})
const getAllPost= asyncHandler(async(req,res)=>{
    const posts= await Post.find().sort({createdAt:-1}).populate("author","name _id").populate("comments.user", "name _id");
    console.log("getallposts post",posts)
    return res.status(200).json(new ApiResponse(200,posts,"All  posts fetched Successfully"))
})
const getUserPost= asyncHandler(async(req,res)=>{
    console.log("im inside user post :")
    console.log("req.params.id",req.params.id)
    //  const posts= await Post.find({author:req.params.id}).sort({createdAt:-1});
    //  const author = await User.findById(req.params.id).select("name email bio");
      const posts = await Post.find({author: req.params.id })
    .populate("author", "name _id") 
     .populate("comments.user", "name _id") 
    .sort({ createdAt: -1 });
    const author = await User.findById(req.params.id).select("name email bio");
     console.log("posts",posts)
     return res.status(200).json(new ApiResponse(200,{ author,posts},"All User posts fetched Successfully"))
})

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const userId = req.user._id;
  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    await post.save();
    return res.status(200).json(new ApiResponse(200, post, "Like removed"));
  } else {
    post.likes.push(userId);
    await post.save();
    return res.status(200).json(new ApiResponse(200, post, "Post liked"));
  }
});
const addComment= asyncHandler(async(req,res)=>{
    const{text}=req.body;
    const post =await Post.findById(req.params.postId);
    if(!post){
        throw new ApiError(404,"post is not found for like")
    }
    post.comments.push({
        user:req.user._id,
        text,
    })
    await post.save();
    return res.status(200).json(new ApiResponse(200,post,"Comment added successfully"))
})
const getPostComments= asyncHandler(async(req,res)=>{
    console.log("im inide getpost comments")
      const post= await Post.findById(req.params.postId).populate("comments.user","name _id");
      if(!post){
        throw new ApiError(404,"Post not found!")
      }
      console.log("im indise getpostcomment and post is :",post)
      return res.status(200).json(new ApiResponse(200,post,"Comments fetched Successfully"))
})

export {createPost,getAllPost,getUserPost,toggleLike,addComment,getPostComments}