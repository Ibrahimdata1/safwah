import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useEffect, useState } from "react";
import axios from "axios";
function NewsFeed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getFeed = async () => {
      const res = await axios.get("http://localhost:8080/api/newsFeed");
      setPosts(res.data.data);
    };
    getFeed();
  }, []);
  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">📰 Safwah Feed</h1>
        <p className="text-center text-gray-400 mb-8">
          Share live news and new ideas
        </p>
        <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 shadow mb-10">
          <PostForm onPost={handleNewPost} />
        </div>
        <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NewsFeed;
