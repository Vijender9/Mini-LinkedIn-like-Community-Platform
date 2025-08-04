import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfileWithPosts = async () => {
    try {
      console.log("im going for fetch profiles ")
      const res = await API.get(`/posts/user/${id}`);
      console.log("response is in profile page :",res);
      const { author, posts } = res.data.data;
      setProfile(author);
      setPosts(posts);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  useEffect(() => {
    fetchProfileWithPosts();
  }, [id]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      {/* Profile Info */}
      <div className="bg-white shadow p-6 rounded mb-6">
        <h2 className="text-2xl font-semibold mb-1">{profile.name}</h2>
        <p className="text-gray-500 mb-1">{profile.email}</p>
        <p className="text-gray-700">{profile.bio || "No bio provided."}</p>
      </div>

      {/* Posts */}
      <h3 className="text-xl font-semibold mb-3">Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
