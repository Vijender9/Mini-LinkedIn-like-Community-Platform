import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { addComment,  createPost, getAllPost, getPostComments, getUserPost, toggleLike } from "../controllers/postController.js";
const router= express.Router();

router.post("/createPost",authMiddleware,createPost);
router.get("/getAllPost",getAllPost);
router.get("/user/:id",getUserPost);
router.put("/:postId/togglelike",authMiddleware,toggleLike)
router.post("/:postId/comment",authMiddleware,addComment);
router.get("/:postId/getComments",getPostComments)
export {router}
