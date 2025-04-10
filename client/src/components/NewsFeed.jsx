import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useEffect, useState } from "react";
import axios from "axios";
function NewsFeed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getFeed = async () => {
      const newsFeed = await axios.get("http://localhost:8080/api/newsFeed");
      setPosts(newsFeed.data.data);
    };
    getFeed();
  }, []);
  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };
  return (
    <div className="min-h-screen bg-[#121212f5] text-white py-10 px-4 md:px-12 col-span-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">📰 Safwah Feed</h1>
        <p className="text-center text-gray-400 mb-8">
          Share live news and new ideas
        </p>
        <PostForm onPost={handleNewPost} />
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
              postId={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NewsFeed;
