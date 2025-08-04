import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios.js";
export default function CreatePost() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await API.post("/posts/createPost", { content });
    setContent("");
    setTitle("");
    console.log({ title, content, tags, image });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Content Input */}
          <textarea
            placeholder="What's on your mind?"
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
          </div>

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-3 rounded-xl transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
