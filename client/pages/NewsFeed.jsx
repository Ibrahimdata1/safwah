import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const getFeed = async () => {
      const res = await axios.get("http://localhost:8080/api/newsFeed");
      setPosts(res.data.data);
    };
    getFeed();
  }, []);
  const handlePost = async () => {
    if (!title || !content) {
      setError("Title and Content Cannot be empty!");
      return;
    }
    setError("");
    try {
      const newPost = {
        title,
        content,
      };
      await axios.post("http://localhost:8080/api/newsFeed", {
        title,
        content,
      });
      setPosts((prev) => [newPost, ...prev]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("error newsFeed 500", error);
    }
  };
  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">📰 Safwah Feed</h1>
        <p className="text-center text-gray-600 mb-8">
          Share live news and new ideas
        </p>
        <div className="bg-gray-50 border rounded-xl p-4 mb-10">
          <h2 className="text-lg font-semibold mb-3">
            📢 Post Your Own Content
          </h2>
          <Input
            placeholder="Topic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />
          <Textarea
            placeholder="ContentPost"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <Button onClick={handlePost} className="cursor-pointer">
            Post
          </Button>
        </div>
        <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} title={post.title} content={post.content} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NewsFeed;
