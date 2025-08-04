import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import API from "../api/axios.js";

export default function PostCard({ post, currentUser }) {
  const author = post.author || {};
  const [likes, setLikes] = useState(post.likes || []);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const isLiked = currentUser && likes.includes(currentUser._id);
   
  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/togglelike`);
      console.log("res like is:",res)
      setLikes(res.data.data.likes);
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
       await API.post(`/posts/${post._id}/comment`, {
        text: comment,
      });
     
      const response = await API.get(`/posts/${post._id}/getComments`);
      
      setComments(response.data.data.comments);
      setComment("");
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };
  console.log("author in profile:",author)

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border hover:shadow-lg transition duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Link to={`/profile/${author._id}`} className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-lg hover:bg-gray-400 transition">
            {author.name?.charAt(0) || "A"}
          </div>
        </Link>

        <div className="flex flex-col">
          <Link to={`/profile/${author._id}`} className="hover:underline">
            <span className="font-semibold text-gray-800 text-base">
              {author.name || "Anonymous"}
            </span>
          </Link>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 text-[15px] leading-relaxed">{post.content}</p>

      {/* Action Buttons */}
      <div className="flex gap-5 mt-4 pt-3 border-t text-gray-600 text-sm">
        <button
          onClick={handleLike}
          className={`hover:text-blue-600 transition`}
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"} ({likes.length})
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/posts/${post._id}`);
            alert("Post link copied!");
          }}
          className="hover:text-blue-600 transition"
        >
          🔗 Share
        </button>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          Post
        </button>
      </form>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="mt-4 max-h-64 overflow-y-auto pr-1 space-y-3">
          {comments.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-gray-100 px-3 py-2 rounded-xl text-sm text-gray-800"
            >
              <div className="font-bold text-gray-700">
                {c.user?.name || "User"}:
              </div>
              <div>{c.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


