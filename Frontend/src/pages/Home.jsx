import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api/axios.js";
import PostCard from "../components/PostCard.jsx"; // Make sure to create this

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/getAllPost");
      console.log("all posts repsones",res)
      setPosts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!content.trim()) return;

  //   try {
  //     await API.post("/posts/createPost", { content });
  //     setContent("");
  //     fetchPosts();
  //   } catch (error) {
  //     console.error("Failed to create post", error);
  //   }
  // };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      

      {/* Post Feed */}
      {Array.isArray(posts) &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Home;
